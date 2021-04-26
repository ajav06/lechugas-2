import { Router } from 'https://deno.land/x/oak/mod.ts'

import {
  listaProveedores,
  consultarProveedor
} from '../components/proveedor/controller.ts'

const router = new Router()

router.get('/', (ctx) => {
  ctx.response.body = 'Hello World!'
})

router.get('/api/v1/proveedores/', listaProveedores)
router.get('/api/v1/proveedor/:id/', consultarProveedor)

export { router }
