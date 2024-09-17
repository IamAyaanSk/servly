import request from 'supertest'
import express from 'express'
import updateServiceHistory from '../controllers/updateServiceHistory.js'

const app = express()
app.use(express.json())
app.post('/services/:id', updateServiceHistory)

describe('POST /services/:id', () => {
  it('should return 500 if service ID is invalid', async () => {
    const response = await request(app)
      .post('/services/invalid-id')
      .query({ page: 1 })
      .send({})

    expect(response.status).toBe(500)
  })
})
