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
    const data = await axiod.get(
      'https://s3.amazonaws.com/dolartoday/data.json'
    )
    console.log(
      'DolarToday: ',
      data.data.USD.transferencia,
      '  BCV: ',
      data.data.USD.sicad2
    )
  } catch (error) {
    console.log(error)
  }
}

export const consultarYadio = async () => {
  try {
    const data = await axiod.get('https://api.yadio.io/rate/VES/USD')
    console.log('Yadio: ', data.data.rate)
  } catch (error) {
    console.log(error)
  }
}

export const consultarLocalBitcoin = async () => {
  try {
    const data = await axiod.get('https://api.bitcoinvenezuela.com/v2/')
    console.log('LocalBitcoins: ', data.data.exchange_rates.USDVES)
  } catch (error) {
    console.log(error)
  }
}

export const consultarMonitorDolar = async () => {
  try {
    const data = await axiod.get('https://monitor-dolar.herokuapp.com/api/v1/')
    const value = data.data.price
      .toString()
      .replace(/\./g, '')
      .replace(',', '.')
    console.log('MonitorDolar: ', parseFloat(value))
  } catch (error) {
    console.log(error)
  }
}
