import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts'
import { Client } from 'https://deno.land/x/postgres/mod.ts'

import { Dolar } from '../components/dolar/model.ts'
import { Proveedor } from '../components/proveedor/model.ts'
// import { config } from 'https://deno.land/x/dotenv/mod.ts'

const env = Deno.env.toObject()

const connector = new PostgresConnector({
  database: env.DATABASE,
  host: env.HOST,
  username: env.USERNAME,
  password: env.PASSWORD,
  port: 5432
})

const client = new Client({
  user: env.USERNAME,
  database: env.DATABASE,
  hostname: env.HOST,
  password: env.PASSWORD,
  port: 5432
})

const db = await new Database(connector)

console.log('Base de datos conectada')

db.link([Proveedor, Dolar])

await db.sync()

await client.connect()

export { db, client }
