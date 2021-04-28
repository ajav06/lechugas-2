import { getProveedor, getProveedores } from './dao.ts'
import { proveedorResource, proveedorlist } from './dto.ts'

export const listaProveedores = async ({ res }: { res: any }) => {
  try {
    const data = await getProveedores()

    res.status = 200
    res.send({
      data: proveedorlist(data)
    })
  } catch (error) {
    console.log(res)
    res.status = 500
    res.send({
      message: 'SERVER ERROR',
      error: error.toString()
    })
  }
}

export const consultarProveedor = async ({
  res,
  params
}: {
  res: any
  params: any
}) => {
  console.log(params)
  try {
    const id = params.id
    const data = await getProveedor(id)

    res.status = 200
    res.send({
      message: 'OK',
      data: proveedorResource(data)
    })
  } catch (error) {
    res.status = 500
    res.send({
      message: 'SERVER ERROR',
      error: error.toString()
    })
  }
}
