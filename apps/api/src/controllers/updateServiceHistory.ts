import { errorResponseMap } from '../constants/responseMaps/errorResponsMap.js'
import { db as kysleyClient, sql } from '@repo/db/client'
import {
  serviceHistoryQueryZodSchema,
  updateServiceHistoryParamsZODSchema,
  updateServiceRequestHistoryZodSchema,
} from '@repo/data-validation/zod'

import { NextFunction, Request, Response } from 'express'
import { redisClient } from '../constants/global.js'
import {
  UpdateServiceHistoryResponse,
  ApiResponseStatus,
} from '@repo/common-types/api-responses'

import { HttpError } from '../constants/global.js'
import { successResponseMap } from '../constants/responseMaps/successResponseMap.js'

export default async function (
  req: Request,
  res: Response<UpdateServiceHistoryResponse>,
  next: NextFunction
) {
  try {
    const { id } = updateServiceHistoryParamsZODSchema.parse(req.params)
    const { page } = serviceHistoryQueryZodSchema.parse(req.query)

    if (!id) {
      const error = new HttpError(errorResponseMap['service/invalidId'], 400)
      return next(error)
    }

    const updateServiceRequestData = req.body
    const validatedUpdateServiceRequestData =
      updateServiceRequestHistoryZodSchema.parse(updateServiceRequestData)

    const serviceToUpdate = await kysleyClient
      .selectFrom('service_history')
      .select([
        'id',
        'customer_id',
        'service_date',
        'service_type',
        'description',
        'amount',
        'status',
        'payment_method',
        'service_provider',
        'fees',
      ])
      .where('id', '=', id)
      .executeTakeFirst()

    if (!serviceToUpdate) {
      const error = new HttpError(errorResponseMap['service/invalidId'], 400)
      return next(error)
    }

    // Update only the fields that are present in the request body
    const updatedService = {
      service_type:
        validatedUpdateServiceRequestData.serviceType ||
        serviceToUpdate.service_type,
      description:
        validatedUpdateServiceRequestData.description ||
        serviceToUpdate.description,
      amount:
        validatedUpdateServiceRequestData.amount || serviceToUpdate.amount,
      status:
        validatedUpdateServiceRequestData.status || serviceToUpdate.status,

      payment_method:
        validatedUpdateServiceRequestData.paymentMethod ||
        serviceToUpdate.payment_method,
      service_provider:
        validatedUpdateServiceRequestData.serviceProvider ||
        serviceToUpdate.service_provider,

      fees: validatedUpdateServiceRequestData.fees || serviceToUpdate.fees,
    }

    await kysleyClient.transaction().execute(async (trx) => {
      await sql`SELECT 1 FROM service_history WHERE id = ${id} FOR UPDATE;`.execute(
        trx
      )

      await trx
        .updateTable('service_history')
        .set({
          ...updatedService,
          amount: Number(updatedService.amount),
          fees: Number(updatedService.fees),
        })
        .where('id', '=', id)
        .executeTakeFirstOrThrow()
    })

    redisClient.del(`service_history:page-${page}`)

    return res.status(201).json({
      status: ApiResponseStatus.success,
      response: successResponseMap['service/fetch'],
    })
  } catch (err) {
    return next(err)
  }
}
