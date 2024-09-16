import { NextFunction, Request, Response } from 'express'
import { redisClient } from '@repo/cache/redis'
import { kysleyClient } from '@repo/db/kysley'
import { unpack, pack } from 'msgpackr'
import { GetServiceHistoryPayload } from '@repo/types/api-responses'
import {
  GetServiceHistoryResponse,
  ApiResponseStatus,
} from '@repo/types/api-responses'
import { serviceHistoryQueryZodSchema } from '@repo/data-validation/zod'

export default async function getServiceHistory(
  req: Request,
  res: Response<GetServiceHistoryResponse>,
  next: NextFunction
) {
  try {
    const { page } = serviceHistoryQueryZodSchema.parse(req.query)
    const limit = 50000

    const [cachedDatabaseResponse, totalResultsCached] = await Promise.all([
      redisClient.getBuffer(`service_history:page-${page}`),
      redisClient.get(`service_history:total-results`),
    ])

    if (cachedDatabaseResponse && totalResultsCached) {
      const unpackedCachedDatabaseResponse: GetServiceHistoryPayload[] = unpack(
        cachedDatabaseResponse
      )
      return res.json({
        status: ApiResponseStatus.success,
        response: {
          totalResults: parseInt(totalResultsCached),
          totalPages: Math.ceil(parseInt(totalResultsCached) / limit),
          payload: unpackedCachedDatabaseResponse,
        },
      })
    }

    const offSet = (page - 1) * limit

    const [serviceRequestHistory, totalResults] = await Promise.all([
      kysleyClient
        .selectFrom('service_history')
        .select([
          'id',
          'customer_id',
          'service_date',
          'service_type',
          'description',
          'amount',
          'status',
          'transaction_id',
          'payment_method',
          'service_provider',
          'account_id',
          'reference_id',
          'fees',
        ])
        .offset(offSet)
        .limit(limit)
        .orderBy('created_at', 'desc')
        .execute(),
      kysleyClient
        .selectFrom('service_history')
        .select(kysleyClient.fn.count('id').as('count'))
        .executeTakeFirst(),
    ])

    if (!totalResults) {
      throw new Error('Failed to fetch row counts from database')
    }
    if (!totalResults.count) {
      totalResults.count = 0
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
        payload: serviceRequestHistory,
      },
    })
  } catch (err) {
    return next(err)
  }
}
