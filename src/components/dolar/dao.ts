import { time } from 'https://denopkg.com/burhanahmeed/time.ts@v2.0.1/mod.ts'
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
    const fecha = time().tz('America/Caracas')
    const date = new Date(fecha.toString())
    console.log(fecha, date)

    const data = await Dolar.create({
      precio: value.precio,
      fecha: date,
      id_proveedor: value.proveedor
    })

    return data
  } catch (error) {
    throw error
  }
}

export const getLastDolarByProveedor = async (id: string | number) => {
  try {
    const data: any = await Dolar.where('id_proveedor', id)
      .orderBy('created_at', 'desc')
      .limit(1)
      .get()

    return data[0]
  } catch (error) {
    throw error
  }
}
