// import { Application } from 'https://deno.land/x/oak/mod.ts'
import { Database } from 'https://deno.land/x/denodb/mod.ts'
import opine, { serveStatic } from 'https://deno.land/x/opine@1.3.3/mod.ts'

import { db } from './postgresql.ts'
import { router } from '../routes/index.ts'

export class Server {
  app: any
  db: Database

  constructor() {
    this.app = opine()
    this.routes()
    this.db = db
  }

  routes() {
    this.app.use('/api/v1/', router)
    this.app.use('/public/', serveStatic(`${Deno.cwd()}/public/`))
  }

  listen() {
    this.app.listen({ port: 8080 })
    console.log('Server running at http://localhost:8080')
  }
}
