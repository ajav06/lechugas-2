import { Dolar } from './model.ts'

export const geDolar = async (id: string | number) => {
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
