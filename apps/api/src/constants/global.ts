import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT ?? 3000
const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN
const REDIS_CONNECTION_URL = process.env.REDIS_CONNECTION_URL ?? ''

class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export { PORT, CLIENT_DOMAIN, HttpError, REDIS_CONNECTION_URL }
