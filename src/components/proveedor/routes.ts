import { Router } from 'https://deno.land/x/opine@1.3.3/mod.ts'
import { listaProveedores, consultarProveedor } from './controller.ts'

const router = new Router()

router.get('/', listaProveedores)
router.get('/:id', consultarProveedor)

export const proveedorRoutes = router
