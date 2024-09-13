import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import { PORT } from '@/constants/global.js'

const server = express()

server.get('/', (req: Request, res: Response) => {
  res.send('Hello')
})

server.listen(PORT, () => {
  console.log(`Server is Fire at http://localhost:${PORT}`)
})
