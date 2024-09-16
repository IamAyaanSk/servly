import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { PORT, CLIENT_DOMAIN } from './constants/global.js'
import serviceRouter from './routes/serviceRouter.js'
import errorHandler from './middlewares/errorHandler.js'
import rateLimiter from './middlewares/rateLimit.js'

const server = express()

server.set('trust proxy', true)
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(
  cors({
    origin: CLIENT_DOMAIN,
  })
)
server.use(helmet())

server.use((req, res, next) => {
  res.removeHeader('X-Powered-By')
  res.removeHeader('X-RateLimit-Limit')
  res.removeHeader('X-RateLimit-Remaining')
  res.removeHeader('X-RateLimit-Reset')
  next()
})

server.use(rateLimiter)

server.use('/services', serviceRouter)
server.use(errorHandler)

server.listen(PORT, () => {
  console.log(`Server is Live at port - ${PORT} 🚀`)
})
