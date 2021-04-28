import { Router } from 'https://deno.land/x/opine@1.3.3/mod.ts'
import { consultarPrecioProveedor } from './controller.ts'

const router = new Router()

// router.get('/', listaProveedores)
router.get('/:id', consultarPrecioProveedor)

export const dolarRoutes = router
