import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts'
import { Client } from 'https://deno.land/x/postgres/mod.ts'

import { Dolar } from '../components/dolar/model.ts'
import { Proveedor } from '../components/proveedor/model.ts'

const { args } = Deno

const connector = new PostgresConnector({
  database: parse(args).DATABASE,
  host: parse(args).DATABASE,
  username: parse(args).HOST,
  password: parse(args).PASSWORD,
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
