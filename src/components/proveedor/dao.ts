import { Proveedor } from './model.ts'

export const getProveedor = async (id: string | number) => {
  try {
    const data = await Proveedor.find(id)

    if (!data) {
      throw 'Proveedor no encontrado'
    }

    return data
  } catch (error) {
    throw error
  }
}

export const getProveedores = async () => {
  try {
    const data = await Proveedor.orderBy('id').all()
    return data
  } catch (error) {
    throw error
  }
}
