import { Router } from 'https://deno.land/x/opine@1.3.3/mod.ts'
import {
  consultarHistorialProveedor,
  consultarPrecioProveedor
} from './controller.ts'

const router = new Router()

// router.get('/', listaProveedores)
router.get('/:id', consultarPrecioProveedor)
router.get('/historial/:id', consultarHistorialProveedor)

export const dolarRoutes = router
