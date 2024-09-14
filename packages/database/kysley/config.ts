import { Pool } from 'pg'
import { Kysely, PostgresDialect, sql } from 'kysely'
import { DB } from '../generated/types.js'

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.POSTGRES_DATABASE_URL,
    max: 10,
    ssl: {
      rejectUnauthorized: false,
    },
  }),
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
const db = new Kysely<DB>({
  dialect,
})

export { sql, db }
