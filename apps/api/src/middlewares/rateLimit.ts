import { HttpError } from '../constants/global.js'
import { redisClient } from '../constants/global.js'
import { NextFunction, Request, Response } from 'express'
import { errorResponseMap } from '../constants/responseMaps/errorResponsMap.js'

export default async function rateLimiter(
  req: Request,
  _: Response,
  next: NextFunction
) {
  try {
    const ip = req.headers['x-forwarded-for'] || req.ip
    const userRequestsRecord = await redisClient.get(`$rate-limiter:${ip}`)

    if (!userRequestsRecord) {
      redisClient.setex(`$rate-limiter:${ip}`, 60, '1')
      return next()
    }

    const totalUserRequests = await redisClient.incr(`$rate-limiter:${ip}`)

    if (totalUserRequests - 1 > 20) {
      const error = new HttpError(errorResponseMap['service/rateLimit'], 429)
      return next(error)
    }

    return next()
  } catch (err) {
    return next(err)
  }
}
