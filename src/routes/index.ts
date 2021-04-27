// import { Router } from 'https://deno.land/x/oak/mod.ts'
import { Router } from 'https://deno.land/x/opine@1.3.3/mod.ts'

import { proveedorRoutes } from '../components/proveedor/routes.ts'

const router = new Router()

router.get('/deno', function (req, res) {
  res.send('Hello Deno')
})

router.use('/proveedores', proveedorRoutes)

export { router }
