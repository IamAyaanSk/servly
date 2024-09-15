import { HttpError } from '@/constants/global.js'
import { redisClient } from '@repo/cache/redis'
import { NextFunction, Request, Response } from 'express'

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
      const error = new HttpError(
        'Rate limit exceeded. Please wait before making more requests.',
        429
      )
      return next(error)
    }

    return next()
  } catch (err) {
    return next(err)
  }
}
