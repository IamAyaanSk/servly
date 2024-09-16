import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000
const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

import { Redis } from 'ioredis'
const REDIS_CONNECTION_URL = process.env.REDIS_CONNECTION_URL || ''
const redisClient = new Redis(REDIS_CONNECTION_URL)

redisClient.on('connecting', () => {
  console.log('Connecting to Redis.... ')
})

redisClient.on('ready', () => {
  console.log('Redis Client is ready to use 🤘')
})

class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export { PORT, CLIENT_DOMAIN, HttpError, redisClient }
