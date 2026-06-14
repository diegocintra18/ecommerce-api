export const ApiResponse = {
  success(response: any, data: unknown, meta?: Record<string, unknown>) {
    if (data && typeof data === 'object') {
      const maybeData = (data as any).data
      const maybeMeta = (data as any).meta

      if (maybeData !== undefined && maybeMeta !== undefined) {
        return response.status(200).json({
          data: maybeData,
          meta: maybeMeta,
        })
      }
    }

    const payload = meta ? { data, meta } : { data }
    return response.status(200).json(payload)
  },

  created(response: any, data: unknown) {
    return response.status(201).json({ data })
  },

  badRequest(response: any, message = 'Bad request', details?: unknown) {
    return response.status(400).json({
      error: {
        code: 'BAD_REQUEST',
        message,
        details,
      },
    })
  },

  validationFailed(response: any, message = 'Validation failed', details?: unknown) {
    return response.unprocessableEntity({
      error: {
        code: 'VALIDATION_FAILED',
        message,
        details,
      },
    })
  },

  notFound(response: any, message = 'Resource not found') {
    return response.notFound({
      error: {
        code: 'RESOURCE_NOT_FOUND',
        message,
      },
    })
  },

  internalError(response: any, message = 'Internal server error') {
    return response.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message,
      },
    })
  },
}
