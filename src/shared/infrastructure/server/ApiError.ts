import HttpStatus from 'http-status-codes';

export class ApiError extends Error {
  public statusCode: number;
  public extra: Record<string, unknown>;

  constructor(
    message: string,
    statusCode = HttpStatus.BAD_REQUEST,
    extra?: Record<string, unknown>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.extra = extra || {};
  }

  static badRequest(message: string, extra?: Record<string, unknown>) {
    return new ApiError(message, HttpStatus.BAD_REQUEST, extra);
  }

  static notFound(message: string, extra?: Record<string, unknown>) {
    return new ApiError(message, HttpStatus.NOT_FOUND, extra);
  }

  static conflict(message: string, extra?: Record<string, unknown>) {
    return new ApiError(message, HttpStatus.CONFLICT, extra);
  }

  static unauthorized(message: string, extra?: Record<string, unknown>) {
    return new ApiError(message, HttpStatus.UNAUTHORIZED, extra);
  }

  static forbidden(message: string, extra?: Record<string, unknown>) {
    return new ApiError(message, HttpStatus.FORBIDDEN, extra);
  }

  static internal(message: string, extra?: Record<string, unknown>) {
    return new ApiError(message, HttpStatus.INTERNAL_SERVER_ERROR, extra);
  }
}
