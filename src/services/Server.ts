// import { Application } from 'https://deno.land/x/oak/mod.ts'
import { Database } from 'https://deno.land/x/denodb/mod.ts'
import opine, { serveStatic } from 'https://deno.land/x/opine@1.3.3/mod.ts'
import { opineCors } from 'https://deno.land/x/cors/mod.ts'
import { parse } from 'https://deno.land/std/flags/mod.ts'

import { db } from './postgresql.ts'
import { router } from '../routes/index.ts'
import {
  consultarDolarToday,
  consultarYadio,
  consultarLocalBitcoin,
  consultarMonitorDolar,
  consultaAutomatica,
  consultaAutomaticaDiaria
} from '../components/dolar/controller.ts'

const { args } = Deno
const DEFAULT_PORT = 8000
const argPort = parse(args).port
const port = argPort ? Number(argPort) : DEFAULT_PORT

export class Server {
  app: any
  db: Database

  constructor() {
    this.app = opine()
    this.routes()
    this.db = db
    consultarDolarToday()
    consultarYadio()
    consultarLocalBitcoin()
    consultarMonitorDolar()
    consultaAutomatica()
    consultaAutomaticaDiaria()
  }

  routes() {
    this.app.use(opineCors())
    this.app.use('/api/v1/', router)
    this.app.use('/public/', serveStatic(`${Deno.cwd()}/public/`))
  }

  listen() {
    this.app.listen({ port })
    console.log(`Server running at http://localhost:${port}`)
  }
}
