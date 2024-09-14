import { NextFunction, Request, Response } from 'express'
import { redisClient } from '@repo/cache/redis'
import { kysleyClient } from '@repo/db/kysley'
import { encode, decode } from '@msgpack/msgpack'

import ApiResponseStatus from '@/types/enums/apiResponseStatus.js'

export default async function getServiceHistory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = parseInt(req.query.page as string) || 1

    console.time('Service history fetch from redis cache')
    const cachedResponse = await redisClient.get(`service_history:page-${page}`)
    console.timeEnd('Service history fetch from redis cache')
    if (cachedResponse) {
      console.time('Decoding data with msgpack')
      const serviceRequestHistoryBuffer = Buffer.from(cachedResponse, 'base64')
      const serviceRequestHistory = decode(
        new Uint8Array(serviceRequestHistoryBuffer)
      )

      console.timeEnd('Decoding data with msgpack')
      return res.json({
        status: ApiResponseStatus.success,
        response: serviceRequestHistory,
      })
    }

    const offSet = page * 50000

    console.time('Service history fetch from database')
    const ServiceRequestHistory = await kysleyClient
      .selectFrom('service_history')
      .select([
        'customerId',
        'serviceDate',
        'serviceType',
        'description',
        'amount',
        'status',
        'transactionId',
        'paymentMethod',
        'serviceProvider',
        'accountId',
        'referenceId',
        'fees',
      ])
      .offset(offSet)
      .limit(50000)
      .execute()

    console.time('Compressing data with msgpack')
    const compressedDataToCache = encode(ServiceRequestHistory)
    const bufferedData = Buffer.from(compressedDataToCache)
    console.timeEnd('Compressing data with msgpack')

    redisClient.setex('service_history:page-${page}', 86400, bufferedData)

    console.timeEnd('Service history fetch from database')

    return res.json({
      status: ApiResponseStatus.success,
      response: ServiceRequestHistory,
    })
  } catch (err) {
    next(err)
  }
}
