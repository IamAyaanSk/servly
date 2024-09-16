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
  res.status(err.status || 500).json({
    status: ApiResponseStatus.error,
    response: err.message || errorResponseMap['server/defaultInternalError'],
    detail: err.stack || errorResponseMap['service/defaultErrorStack'],
  })
}
