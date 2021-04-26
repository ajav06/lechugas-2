import { Router } from 'https://deno.land/x/oak/mod.ts'

import { listaProveedores } from '../components/proveedor/controller.ts'

const router = new Router()

router.get('/', (ctx) => {
  ctx.response.body = 'Hello World!'
})

router.get('/api/v1/proveedores/', (ctx) => listaProveedores(ctx))

export { router }
