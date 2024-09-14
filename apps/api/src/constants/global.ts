import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000
const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN || 'http://localhost:3000'

export { PORT, CLIENT_DOMAIN }
