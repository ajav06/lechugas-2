import { Dolar } from './model.ts'

export const getDolar = async (id: string | number) => {
  try {
    const data = await Dolar.find(id)

    if (!data) {
      throw 'Dolar no encontrado'
    }

    return data
  } catch (error) {
    throw error
  }
}

export const addDolar = async (value: any) => {
  try {
    const data = await Dolar.create({
      precio: value.precio,
      fecha: new Date(),
      id_proveedor: value.proveedor
    })

    return data
  } catch (error) {
    throw error
  }
}
