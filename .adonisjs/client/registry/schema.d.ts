/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/UserValidator').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/UserValidator').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/NewAccountController').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/NewAccountController').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/UserValidator').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/UserValidator').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/AccessTokensController').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/AccessTokensController').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/ProfileController').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/ProfileController').default['show']>>>
    }
  }
  'profile.access_tokens.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/account/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/AccessTokensController').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/AccessTokensController').default['destroy']>>>
    }
  }
  'categories.store': {
    methods: ["POST"]
    pattern: '/api/v1/category'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/CategoryValidator').CreateCategoryValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/CategoryValidator').CreateCategoryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/CategoriesController').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/CategoriesController').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'categories.update': {
    methods: ["PUT"]
    pattern: '/api/v1/category/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/CategoryValidator').UpdateCategoryValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/CategoryValidator').UpdateCategoryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/CategoriesController').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/CategoriesController').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'products.store': {
    methods: ["POST"]
    pattern: '/api/v1/product'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/ProductValidator').CreateProductValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/ProductValidator').CreateProductValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/ProductsController').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/ProductsController').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'categories.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/category'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/CategoryValidator').CategoryFiltersValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/CategoriesController').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/CategoriesController').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
