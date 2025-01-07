import { Redis } from 'ioredis'
import { REDIS_CONNECTION_URL } from '@/constants/global'

const redisClient = new Redis(REDIS_CONNECTION_URL)

redisClient.on('error', (error) => {
  console.log('Redis Client Error', error)
})

redisClient.on('connect', () => {
  console.log('Redis Client Connected')
})

redisClient.on('ready', () => {
  console.log('Redis Client Ready')
})

redisClient.on('reconnecting', () => {
  console.log('Redis Client Reconnecting')
})

redisClient.on('end', () => {
  console.log('Redis Client End')
})

export default redisClient
