import dotenv from 'dotenv'
dotenv.config()
import { Redis } from 'ioredis'
const REDIS_CONNECTION_URL = process.env.REDIS_CONNECTION_URL || ''
const redis = new Redis(REDIS_CONNECTION_URL)

redis.on('connecting', () => {
  console.log('Connecting to Redis.... ')
})

redis.on('ready', () => {
  console.log('Redis Client is ready to use 🤘')
})

export const redisClient = redis
