import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts'
import { Dolar } from '../components/dolar/model.ts'
import { Proveedor } from '../components/proveedor/model.ts'

const connector = new PostgresConnector({
  database: 'sriqxnky',
  host: 'queenie.db.elephantsql.com',
  username: 'sriqxnky',
  password: 'T5bxTkIygubvmBgkydjaK6GDn6bf_BiQ',
  port: 5432
})

const db = await new Database(connector)

console.log('Base de datos conectada')

db.link([Proveedor, Dolar])

await db.sync()

export { db }
