import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts'

const connector = new PostgresConnector({
  database: 'sriqxnky',
  host: 'queenie.db.elephantsql.com',
  username: 'sriqxnky',
  password: 'T5bxTkIygubvmBgkydjaK6GDn6bf_BiQ',
  port: 5432
})

const db = await new Database(connector)

console.log('Base de datos conectada')

export { db }
