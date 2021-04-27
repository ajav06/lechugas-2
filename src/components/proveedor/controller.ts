import { getProveedor, getProveedores } from './dao.ts'
import { proveedorResource, proveedorlist } from './dto.ts'

export const listaProveedores = async ({ response }: { response: any }) => {
  try {
    const data = await getProveedores()

    response.status = 200
    response.body = {
      data: proveedorlist(data)
    }
  } catch (error) {
    response.status = 500
    response.body = {
      message: 'SERVER ERROR',
      error: error.toString()
    }
  }
}

export const consultarProveedor = async ({
  response,
  params
}: {
  response: any
  params: any
}) => {
  try {
    const id = params.id
    const data = await getProveedor(id)

    response.status = 200
    response.body = {
      data: proveedorResource(data)
    }
  } catch (error) {
    response.status = 500
    response.body = {
      message: 'SERVER ERROR',
      error: error.toString()
    }
  }
}
