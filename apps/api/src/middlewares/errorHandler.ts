import { NextFunction, Response, Request } from 'express'

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    status: 'Error',
    response: err.message,
    detail: err.stack,
  })
}
