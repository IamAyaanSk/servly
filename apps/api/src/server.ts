import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { PORT, CLIENT_DOMAIN } from '@/constants/global.js'
import serviceRouter from '@/routes/serviceRouter.js'
import errorHandler from './middlewares/errorHandler.js'

const server = express()

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
  next()
})

server.use('/services', serviceRouter)
server.use(errorHandler)

server.listen(PORT, () => {
  console.log(`Server is Live at http://localhost:${PORT} 🚀`)
})
