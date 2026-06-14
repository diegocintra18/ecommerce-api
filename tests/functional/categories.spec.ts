import { test } from '@japa/runner'
import Database from '@adonisjs/lucid/services/db'
import User from '#models/User'
import Category from '#models/Category'

interface CategoryPayload {
  name: string
}

test.group('Categories', (group) => {
  group.setup(async () => {
    await Database.beginGlobalTransaction()
  })

  group.teardown(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('index returns a JSON list from categories endpoint', async ({ client, assert }) => {
    const response = await client.get('/api/v1/category').accept('application/json')

    response.assertStatus(200)
    assert.isArray(response.body().data.data)
  })

  test('store requires authentication', async ({ client }) => {
    const payload: CategoryPayload = { name: 'New Category' }

    const response = await client.post('/api/v1/category').json(payload).accept('application/json')

    response.assertStatus(401)
  })

  test('authenticated user can create a category', async ({ client, assert }) => {
    const user = await User.create({
      fullName: 'Test User',
      email: 'testuser@example.com',
      password: 'secret123',
    })

    const loginResponse = await client
      .post('/api/v1/auth/login')
      .json({ email: user.email, password: 'secret123' })
      .accept('application/json')

    loginResponse.assertStatus(200)

    const token = loginResponse.body().data.token
    assert.isString(token)

    const payload: CategoryPayload = { name: 'New Category' }

    const response = await client
      .post('/api/v1/category')
      .header('Authorization', `Bearer ${token}`)
      .json(payload)
      .accept('application/json')

    response.assertStatus(201)
    response.assertBodyContains({ data: { name: 'New Category' } })

    const category = await Category.query().where('name', 'New Category').firstOrFail()
    await category.delete()
  })

  test('index supports search filter', async ({ client, assert }) => {
    await Category.create({ name: 'Apple' })
    await Category.create({ name: 'Banana' })
    await Category.create({ name: 'Cherry' })

    const response = await client.get('/api/v1/category').qs({ search: 'an', page: 1, limit: 2 }).accept('application/json')

    response.assertStatus(200)
    assert.isArray(response.body().data.data)
    assert.isAtLeast(response.body().data.data.length, 1)
  })
})
