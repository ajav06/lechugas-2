// import { Router } from 'https://deno.land/x/oak/mod.ts'
import { Router } from 'https://deno.land/x/opine@1.3.3/mod.ts'

import { dolarRoutes } from '../components/dolar/routes.ts'
import { proveedorRoutes } from '../components/proveedor/routes.ts'

const router = new Router()

router.use('/dolares', dolarRoutes)
router.use('/proveedores', proveedorRoutes)

export { router }
