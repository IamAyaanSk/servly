import { HttpError } from '@/constants/global.js'
import { ApiResponseStatus, ErrorResponse } from '@repo/types/api-responses'
import { NextFunction, Response, Request } from 'express'

export default function errorHandler(
  err: HttpError,
  _: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  res.status(err.status || 500).json({
    status: ApiResponseStatus.error,
    response: err.message || `Internal server error`,
    detail: err.stack || 'No error stack',
  })
}
