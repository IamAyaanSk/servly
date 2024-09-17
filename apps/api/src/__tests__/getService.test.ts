import request from 'supertest'
import express, { Express } from 'express'
import getServiceHistory from '../controllers/getServiceHistory.js'
import { redisClient } from '../constants/global.js'
import { db } from '@repo/db/client'

import {
  ApiResponseStatus,
  GetServiceHistoryResponse,
  GetServiceHistoryPayload,
} from '@repo/common-types/api-responses'
import { pack } from 'msgpackr'

jest.mock('../constants/global.js')
jest.mock('@repo/db/client')

const app: Express = express()
app.get('/services', getServiceHistory)

describe('GET /services', () => {
  it('should return service history', async () => {
    const mockCacheData: GetServiceHistoryPayload[] = [
      {
        id: '1',
        customer_id: '123',
        service_date: new Date(),
        service_type: 'LOAN',
        description: 'Sample service',
        amount: 100,
        status: 'COMPLETED',
        transaction_id: 'tx123',
        payment_method: 'Credit Card',
        service_provider: 'BANK',
        account_id: 'acc123',
        reference_id: 'ref123',
        fees: 10,
      },
    ]

    ;(redisClient.getBuffer as jest.Mock).mockResolvedValueOnce(
      pack(JSON.stringify(mockCacheData))
    )
    ;(redisClient.get as jest.Mock).mockResolvedValueOnce('1')

    const res = await request(app).get('/services').query({ page: 1 })

    expect(res.status).toBe(200)
    const responseBody: GetServiceHistoryResponse = res.body
    expect(responseBody.status).toBe(ApiResponseStatus.success)
    expect(responseBody.response.totalResults).toBe(1)
    expect(responseBody.response.payload).toEqual(JSON.stringify(mockCacheData))
  })

  it('should handle errors correctly', async () => {
    ;(redisClient.getBuffer as jest.Mock).mockRejectedValueOnce(
      new Error('Redis failure')
    )

    const res = await request(app).get('/services').query({ page: 1 })

    expect(res.status).toBe(500)
  })
})
