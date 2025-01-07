import { HttpError } from '../constants/global.js'
import {
  ApiResponseStatus,
  ErrorResponse,
} from '@repo/common-types/api-responses'
import { NextFunction, Response, Request } from 'express'
import { errorResponseMap } from '../constants/responseMaps/errorResponsMap.js'

export default function errorHandler(
  err: HttpError,
  _: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  res.status(err.status).json({
    status: ApiResponseStatus.error,
    response: err.message,
    detail: err.stack ?? errorResponseMap['service/defaultErrorStack'],
  })
}
