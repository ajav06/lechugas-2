import axiod from 'https://deno.land/x/axiod/mod.ts'
import { Proveedor } from '../proveedor/model.ts'

// const formatNumber = (num: Number) => {
//   return num
//     .toString()
//     .replace('.', ',')
//     .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
// }

export const consultarDolarToday = async () => {
  //Extrae el precio de Dolar Today y de BCV
  try {
    const response = await axiod.get(
      'https://s3.amazonaws.com/dolartoday/data.json'
    )

    const data = response.data.USD

    console.log('DolarToday: ', data.transferencia, '  BCV: ', data.sicad2)
  } catch (error) {
    console.log(error)
  }
}

export const consultarYadio = async () => {
  try {
    const response = await axiod.get('https://api.yadio.io/rate/VES/USD')

    const data = response.data.rate

    console.log('Yadio: ', data)
  } catch (error) {
    console.log(error)
  }
}

export const consultarLocalBitcoin = async () => {
  try {
    const response = await axiod.get('https://api.bitcoinvenezuela.com/v2/')

    const data = response.data.exchange_rates.USDVES

    console.log('LocalBitcoins: ', data)
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

    console.log('MonitorDolar: ', parseFloat(price))
  } catch (error) {
    console.log(error)
  }
}
