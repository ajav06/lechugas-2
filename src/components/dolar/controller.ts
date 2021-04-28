import axiod from 'https://deno.land/x/axiod/mod.ts'
import {
  time,
  timezone
} from 'https://denopkg.com/burhanahmeed/time.ts@v2.0.1/mod.ts'

import { addDolar, getLastDolarByProveedor } from './dao.ts'
import { dolarResource } from './dto.ts'

// const formatNumber = (num: Number) => {
//   return num
//     .toString()
//     .replace('.', ',')
//     .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
// }

export const consultarPrecioProveedor = async ({
  res,
  req
}: {
  res: any
  req: any
}) => {
  try {
    const id = req.parms.id

    const data = await getLastDolarByProveedor(id)

    res.status = 200
    res.send({
      message: 'OK',
      data: dolarResource(data)
    })
  } catch (error) {
    res.status = 500
    res.send({
      message: 'SERVER ERROR',
      error: error.toString()
    })
  }
}

export const consultarDolarToday = async () => {
  //Extrae el precio de Dolar Today y de BCV
  try {
    const response = await axiod.get(
      'https://s3.amazonaws.com/dolartoday/data.json'
    )

    const data = response.data.USD

    const lastDT = await getLastDolarByProveedor(1)
    const lastBCV = await getLastDolarByProveedor(3)

    if (lastDT.precio != data.transferencia)
      await addDolar({
        precio: data.transferencia,
        proveedor: 1
      })
    else console.log('No hubo actualizacion de DolarToday')

    if (lastBCV.precio != data.sicad2)
      await addDolar({
        precio: data.sicad2,
        proveedor: 3
      })
    else console.log('No hubo actualizacion del BCV')

    console.log('DolarToday: ', data.transferencia, '  BCV: ', data.sicad2)
  } catch (error) {
    console.log(error)
  }
}

export const consultarYadio = async () => {
  try {
    const response = await axiod.get('https://api.yadio.io/rate/VES/USD')

    const data = response.data.rate

    const last = await getLastDolarByProveedor(2)

    if (last.precio != data)
      await addDolar({
        precio: data,
        proveedor: 2
      })
    else console.log('No hubo actualizacion de Yadio')

    console.log('Yadio: ', data)
  } catch (error) {
    console.log(error)
  }
}

export const consultarMonitorDolar = async () => {
  try {
    const response = await axiod.get(
      'https://monitor-dolar.herokuapp.com/api/v1/'
    )

    const data = response.data.price

    const price = data.toString().replace(/\./g, '').replace(',', '.')

    const last = await getLastDolarByProveedor(4)

    if (last.precio != price)
      await addDolar({
        precio: parseFloat(price),
        proveedor: 4
      })
    else console.log('No hubo actualizacion de MonitorDolar')

    console.log('MonitorDolar: ', parseFloat(price))
  } catch (error) {
    console.log(error)
  }
}

export const consultarLocalBitcoin = async () => {
  try {
    const response = await axiod.get('https://api.bitcoinvenezuela.com/v2/')

    const data = response.data.exchange_rates.USDVES

    const last = await getLastDolarByProveedor(5)

    if (last.precio != data)
      await addDolar({
        precio: data,
        proveedor: 5
      })
    else console.log('No hubo actualizacion de LocalBitcoins')

    console.log('LocalBitcoins: ', data)
  } catch (error) {
    console.log(error)
  }
}

export const consultaAutomatica = async () => {
  try {
    let now: any = time().tz('America/Caracas').t
    let hours: any = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes() + 10,
      0,
      0
    )

    let millisTill10: number = hours - now

    if (millisTill10 < 0) {
      hours = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        now.getHours(),
        now.getMinutes() + 10,
        0,
        0
      )
      millisTill10 = hours - now
    }

    setTimeout(function () {
      consultarYadio()
      consultarLocalBitcoin()
      consultaAutomatica()
    }, millisTill10)
  } catch (error) {
    console.log(error)
  }
}

export const consultaAutomaticaDiaria = async () => {
  try {
    let now: any = time().tz('America/Caracas').t
    let hours: any = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      5,
      10,
      0,
      0
    )

    let millisTill10: number = hours - now

    if (millisTill10 < 0) {
      hours = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        5,
        10,
        0,
        0
      )
      millisTill10 = hours - now
    }

    setTimeout(function () {
      consultarDolarToday()
      consultarMonitorDolar()
      consultaAutomaticaDiaria()
    }, millisTill10)
  } catch (error) {
    console.log(error)
  }
}
