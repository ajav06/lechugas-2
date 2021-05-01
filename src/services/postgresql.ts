import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts'
import { Client } from 'https://deno.land/x/postgres/mod.ts'
import { config } from "https://deno.land/x/dotenv/mod.ts";

import { Dolar } from '../components/dolar/model.ts'
import { Proveedor } from '../components/proveedor/model.ts'


const env = config();

const connector = new PostgresConnector({
  database: env.DATABASE,
  host: env.HOST,
  username: env.USERNAME,
  password: env.PASSWORD,
  port: 5432
})

const client = new Client({
  user: 'sriqxnky',
  database: 'sriqxnky',
  hostname: 'queenie.db.elephantsql.com',
  password: 'T5bxTkIygubvmBgkydjaK6GDn6bf_BiQ',
  port: 5432
})

const db = await new Database(connector)

console.log('Base de datos conectada')

db.link([Proveedor, Dolar])

await db.sync()

await client.connect()

export { db, client }
