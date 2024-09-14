import { errorResponseMap } from '@/constants/responseMaps/errorResponsMap.js'
import { kysleyClient, sql } from '@repo/db/kysley'
import { updateServiceRequestHistoryZodSchema } from '@repo/data-validation/zod'

import { NextFunction, Request, Response } from 'express'
import { redisClient } from '@repo/cache/redis'
import {
  UpdateServiceHistoryResponse,
  ApiResponseStatus,
} from '@repo/types/api-responses'

import { HttpError } from '@/constants/global.js'

export default async function (
  req: Request,
  res: Response<UpdateServiceHistoryResponse>,
  next: NextFunction
) {
  try {
    const serviceRequestId = req.params.id

    if (!serviceRequestId) {
      const error = new HttpError(errorResponseMap['service/invalidId'], 400)
      return next(error)
    }

    const updateServiceRequestData = req.body
    const validatedUpdateServiceRequestData =
      updateServiceRequestHistoryZodSchema.parse(updateServiceRequestData)

    const serviceToUpdate = await kysleyClient
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
      .where('id', '=', parseInt(serviceRequestId))
      .executeTakeFirst()

    if (!serviceToUpdate) {
      const error = new HttpError(errorResponseMap['service/invalidId'], 400)
      return next(error)
    }

    // Update only the fields that are present in the request body
    const updatedService = {
      serviceDate:
        validatedUpdateServiceRequestData.serviceDate ||
        serviceToUpdate.serviceDate,
      serviceType:
        validatedUpdateServiceRequestData.serviceType ||
        serviceToUpdate.serviceType,
      description:
        validatedUpdateServiceRequestData.description ||
        serviceToUpdate.description,
      amount:
        validatedUpdateServiceRequestData.amount || serviceToUpdate.amount,
      status:
        validatedUpdateServiceRequestData.status || serviceToUpdate.status,
      transactionId:
        validatedUpdateServiceRequestData.transactionId ||
        serviceToUpdate.transactionId,
      paymentMethod:
        validatedUpdateServiceRequestData.paymentMethod ||
        serviceToUpdate.paymentMethod,
      serviceProvider:
        validatedUpdateServiceRequestData.serviceProvider ||
        serviceToUpdate.serviceProvider,
      accountId:
        validatedUpdateServiceRequestData.accountId ||
        serviceToUpdate.accountId,
      referenceId:
        validatedUpdateServiceRequestData.referenceId ||
        serviceToUpdate.referenceId,
      fees: validatedUpdateServiceRequestData.fees || serviceToUpdate.fees,
    }

    await kysleyClient.transaction().execute(async (trx) => {
      await sql`SELECT 1 FROM service_history WHERE id = ${serviceRequestId} FOR UPDATE;`.execute(
        trx
      )

      await trx
        .updateTable('service_history')
        .set({
          ...updatedService,
        })
        .executeTakeFirstOrThrow()
    })

    // Invalidate cache
    if (parseInt(serviceRequestId) < 50000) {
      redisClient.del('service_history:page-1')
    } else {
      redisClient.del('service_history:page:2')
    }

    return res.status(201).json({
      status: ApiResponseStatus.success,
      response: 'Service updated successfully',
    })
  } catch (err) {
    return next(err)
  }
}
