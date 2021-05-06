import axiod from 'https://deno.land/x/axiod/mod.ts'
import { time } from 'https://denopkg.com/burhanahmeed/time.ts@v2.0.1/mod.ts'

import {
  addDolar,
  getLastDolarByProveedor,
  getLastTenDaysByProveedor
} from './dao.ts'
import { dolarResource } from './dto.ts'

// const formatNumber = (num: Number) => {
//   return num
//     .toString()
//     .replace('.', ',')
//     .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
// }

export const consultarPrecioProveedor = async ({
  res,
  params
}: {
  res: any
  params: any
}) => {
  try {
    const id = params.id

    const data = await getLastDolarByProveedor(id)

    res.status = 200
    res.send({
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

export const consultarHistorialProveedor = async ({
  res,
  params
}: {
  res: any
  params: any
}) => {
  try {
    const id = params.id

    const data = await getLastTenDaysByProveedor(id)

    res.status = 200
    res.send({
      data: data
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

    if (lastDT.precio != data.transferencia) {
      await addDolar({
        precio: data.transferencia,
        proveedor: 1
      })
      calcularPromedio()
    } else console.log('No hubo actualizacion de DolarToday')

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

    const data = parseFloat(response.data.rate.toFixed(2))

    const last = await getLastDolarByProveedor(2)

    if (last.precio != data) {
      await addDolar({
        precio: data,
        proveedor: 2
      })
      calcularPromedio()
    } else console.log('No hubo actualizacion de Yadio')

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

    if (last.precio != price) {
      await addDolar({
        precio: parseFloat(price),
        proveedor: 4
      })
      calcularPromedio()
    } else console.log('No hubo actualizacion de MonitorDolar')

    console.log('MonitorDolar: ', parseFloat(price))
  } catch (error) {
    console.log(error)
  }
}

export const consultarLocalBitcoin = async () => {
  try {
    const response = await axiod.get('https://api.bitcoinvenezuela.com/v2/')

    const data = parseFloat(response.data.exchange_rates.USDVES.toFixed(2))

    const last = await getLastDolarByProveedor(5)

    if (last.precio != data) {
      await addDolar({
        precio: data,
        proveedor: 5
      })
      calcularPromedio()
    } else console.log('No hubo actualizacion de LocalBitcoins')

    console.log('LocalBitcoins: ', data)
  } catch (error) {
    console.log(error)
  }
}

export const calcularPromedio = async () => {
  try {
    const DT = await getLastDolarByProveedor(1)
    const YD = await getLastDolarByProveedor(2)
    const BC = await getLastDolarByProveedor(3)
    const MT = await getLastDolarByProveedor(4)
    const LC = await getLastDolarByProveedor(5)

    let promedio: number =
      (parseFloat(DT.precio) +
        parseFloat(YD.precio) +
        parseFloat(BC.precio) +
        parseFloat(MT.precio) +
        parseFloat(LC.precio)) /
      5

    promedio = parseFloat(promedio.toFixed(2))
    await addDolar({
      precio: promedio,
      proveedor: 6
    })
    console.log('Promedio: ', promedio)
  } catch (error) {
    console.log(error)
  }
}

export const consultaAutomatica = async () => {
  try {
    let tenMin: number = 900000

    setTimeout(function () {
      consultarYadio()
      consultarLocalBitcoin()
      consultaAutomatica()
    }, tenMin)
  } catch (error) {
    console.log(error)
  }
}

export const consultaAutomaticaDiaria = async () => {
  try {
    let now: any = time().tz('America/Caracas').t
    let hours: Date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      5,
      10,
      0,
      0
    )

    let millisTill10: number = hours.getTime() - now

    if (millisTill10 < 0) {
      hours.setHours(hours.getHours() + 24)
      millisTill10 = hours.getTime() - now
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

export const consultaAutomaticaDiaria2 = async () => {
  try {
    let now: any = time().tz('America/Caracas').t
    let hours: Date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      9,
      30,
      0,
      0
    )

    let millisTill10: number = hours.getTime() - now

    if (millisTill10 < 0) {
      hours.setHours(hours.getHours() + 24)
      millisTill10 = hours.getTime() - now
    }

    setTimeout(function () {
      consultarDolarToday()
      consultarMonitorDolar()
      consultaAutomaticaDiaria2()
    }, millisTill10)
  } catch (error) {
    console.log(error)
  }
}

export const consultaAutomaticaDiaria3 = async () => {
  try {
    let now: any = time().tz('America/Caracas').t
    let hours: Date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      4,
      30,
      0,
      0
    )

    let millisTill10: number = hours.getTime() - now

    if (millisTill10 < 0) {
      hours.setHours(hours.getHours() + 24)
      millisTill10 = hours.getTime() - now
      console.log(millisTill10)
    }

    setTimeout(function () {
      console.log('consultaAutomaticaDiaria3')
      // consultarMonitorDolar()
      consultaAutomaticaDiaria3()
    }, millisTill10)
  } catch (error) {
    console.log(error)
  }
}

export const initPrice = async () => {
  try {
    await addDolar({
      precio: 0,
      proveedor: 1
    })
    await addDolar({
      precio: 0,
      proveedor: 2
    })
    await addDolar({
      precio: 0,
      proveedor: 3
    })
    await addDolar({
      precio: 0,
      proveedor: 4
    })
    await addDolar({
      precio: 0,
      proveedor: 5
    })
  } catch (error) {
    console.log(error)
  }
}
