import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000
const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN || 'http://localhost:8080'

class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export { PORT, CLIENT_DOMAIN, HttpError }
