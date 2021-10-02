import { time } from 'https://denopkg.com/burhanahmeed/time.ts@v2.0.1/mod.ts'
import { client } from '../../services/postgresql.ts'
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
    const fecha = time().tz('America/Caracas').toString()

    const data = await Dolar.create({
      precio: value.precio,
      fecha: fecha,
      id_proveedor: value.proveedor
    })

    return data
  } catch (error) {
    throw error
  }
}

export const getLastTenDays = async () => {
  try {
    const fecha = time().tz('America/Caracas').t

    let historial: object[] = []

    for (let index: number = 10; -1 < index; index--) {
      const fechaI = new Date(
        fecha.getFullYear(),
        fecha.getMonth() + 1,
        fecha.getDate() - index
      )
      let rangoI: string = `${fechaI.getFullYear()}-${fechaI.getMonth()}-${fechaI.getDate()}`
      let rangoF: string = `${fechaI.getFullYear()}-${fechaI.getMonth()}-${
        fechaI.getDate() + 1
      }`

      const result = await client.queryObject(
        `SELECT distinct on (id_proveedor) "precio","id_proveedor" FROM "public"."dolares" where fecha between '${rangoI}' and '${rangoF}' ORDER BY id_proveedor ASC, fecha DESC`
      )
      result?.rows?.forEach((item: any) => historial.push(item))
      console.log(result.rows)
    }
    return historial
  } catch (error) {
    throw error
  }
}

export const getLastTenDaysByProveedor = async (id: number | string) => {
  try {
    const options: object = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }

    let historial: number[] = []
    let fechas: string[] = []

    for (let index: number = 10; -1 < index; index--) {
      const fechaI = new Date()
      fechaI.setDate(fechaI.getDate() + -index)

      const fechaF = new Date()
      fechaF.setDate(fechaF.getDate() + 1 + -index)

      let rangoI: string = fechaI.toLocaleString('en-US', options)

      let rangoF: string = fechaF.toLocaleString('en-US', options)

      const result = await client.queryObject(
        `SELECT "precio" FROM "public"."dolares" where id_proveedor=${id} and fecha between '${rangoI}' and '${rangoF}' ORDER BY fecha DESC limit 1`
      )

      result.rows.forEach((item: any) => {
        historial.push(parseFloat(item.precio))
        fechas.push(fechaI.toLocaleString('es-VE', options))
      })
    }

    return {
      fechas: fechas,
      precios: historial
    }
  } catch (error) {
    throw error
  }
}

export const getLastDolarByProveedor = async (id: string | number) => {
  try {
    const data: any = await Dolar.where('id_proveedor', id)
      .orderBy('fecha', 'desc')
      .limit(1)
      .get()

    return data[0]
  } catch (error) {
    throw error
  }
}
