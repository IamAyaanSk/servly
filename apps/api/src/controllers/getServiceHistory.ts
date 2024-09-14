import { NextFunction, Request, Response } from 'express'
import { redisClient } from '@repo/cache/redis'
import { kysleyClient } from '@repo/db/kysley'
import { unpack, pack } from 'msgpackr'

import ApiResponseStatus from '@/types/enums/apiResponseStatus.js'

export default async function getServiceHistory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = 50000

    const [cachedDatabaseResponse, totalResultsCached] = await Promise.all([
      redisClient.getBuffer(`service_history:page-${page}`),
      redisClient.get(`service_history:total-results`),
    ])

    if (cachedDatabaseResponse && totalResultsCached) {
      const unpackedCachedDatabaseResponse = unpack(cachedDatabaseResponse)
      return res.json({
        usedCached: true,
        status: ApiResponseStatus.success,
        response: {
          totalResults: parseInt(totalResultsCached),
          totalPages: Math.ceil(parseInt(totalResultsCached) / limit),
          data: unpackedCachedDatabaseResponse,
        },
      })
    }

    const offSet = (page - 1) * limit

    const [serviceRequestHistory, totalResults] = await Promise.all([
      kysleyClient
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
        .limit(limit)
        .execute(),
      kysleyClient
        .selectFrom('service_history')
        .select(kysleyClient.fn.count('id').as('count'))
        .executeTakeFirst(),
    ])

    if (!totalResults || !totalResults.count) {
      throw new Error('Failed to fetch row counts from database')
    }

    const totalCount = parseInt(totalResults.count as string)
    const totalPages = Math.ceil(totalCount / limit)

    const packedServiceRequestHistory = pack(serviceRequestHistory)

    await redisClient.setex(
      `service_history:page-${page}`,
      86400,
      packedServiceRequestHistory
    )

    await redisClient.setex(
      `service_history:total-results`,
      86400,
      totalResults.count.toLocaleString()
    )

    return res.json({
      status: ApiResponseStatus.success,
      response: {
        totalPages,
        totalResults: totalCount,
        data: serviceRequestHistory,
      },
    })
  } catch (err) {
    next(err)
  }
}
