import app from '@adonisjs/core/services/app'
import { type HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    const status = typeof error === 'object' && error !== null && 'status' in error && typeof (error as any).status === 'number'
      ? (error as any).status
      : 500

    const message = typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string'
      ? (error as any).message
      : 'Internal server error'

    const errorPayload = {
      error: {
        code: status === 500 ? 'INTERNAL_SERVER_ERROR' : 'HTTP_ERROR',
        message: status === 500 ? 'Internal server error' : message,
      },
    }

    if (status === 422 && typeof error === 'object' && error !== null && 'errors' in error) {
      return ctx.response.status(422).json({
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Validation failed',
          details: (error as any).errors,
        },
      })
    }

    if (status === 404) {
      return ctx.response.status(404).json({
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message,
        },
      })
    }

    ctx.logger.error(error)
    return ctx.response.status(status).json(errorPayload)
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
