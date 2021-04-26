import { getProveedor, getProveedores } from './dao.ts'
import { proveedorResource, proveedorlist } from './dto.ts'

export const listaProveedores = async ({ response }: { response: any }) => {
  try {
    const data = await getProveedores()

    response.status(200).json({
      message: 'OK',
      data: proveedorlist(data)
    })
  } catch (error) {
    console.log(error)
    response.status(400).json({
      status: 'error',
      message: 'SERVER ERROR',
      error: error.toString()
    })
  }
}
