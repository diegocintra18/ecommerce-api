import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/User'
import Category from '#models/Category'

interface CategoryPayload {
  name: string
}

test.group('Categories', (group) => {
  let rollback: () => Promise<void>

  group.setup(async () => {
    rollback = await testUtils.database.wrapInGlobalTransaction()
  })

  group.teardown(async () => {
    await rollback()
  })

  test('index returns a JSON list from categories endpoint', async ({ client, assert }) => {
    const response = await client.get('/api/v1/category').accept('application/json')

    response.assertStatus(200)
    assert.isArray(response.body().data)
  })

  test('store requires authentication', async ({ client }) => {
    const payload: CategoryPayload = { name: 'New Category' }

    const response = await client
      .post('/api/v1/category')
      .json(payload)
      .accept('application/json')

    response.assertStatus(401)
  })

  test('authenticated user can create a category', async ({ client }) => {
    const user = await User.create({
      fullName: 'Test User',
      email: 'testuser@example.com',
      password: 'secret123',
    })

    const payload: CategoryPayload = { name: 'New Category' }

    const response = await client
      .loginAs(user)
      .post('/api/v1/category')
      .json(payload)
      .accept('application/json')

    response.assertStatus(201)
    response.assertBodyContains({ data: { name: 'New Category' } })

    const category = await Category.query().where('name', 'New Category').firstOrFail()
    await category.delete()
  })

  test('index supports search filter and pagination meta', async ({ client }) => {
    const user = await User.create({
      fullName: 'Test User',
      email: 'testuser2@example.com',
      password: 'secret123',
    })

    await Category.create({ name: 'Apple' })
    await Category.create({ name: 'Banana' })
    await Category.create({ name: 'Cherry' })

    const response = await client
      .get('/api/v1/category')
      .qs({ search: 'an', page: 1, limit: 2 })
      .accept('application/json')

    response.assertStatus(200)
    response.assertBodyContains({ data: [{ name: 'Banana' }] })
    response.assertBodyContains({ meta: { page: 1, perPage: 2 } })
  })
})
