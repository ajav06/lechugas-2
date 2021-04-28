import { DataTypes, Model } from 'https://deno.land/x/denodb/mod.ts'
import { Proveedor } from '../proveedor/model.ts'

class Dolar extends Model {
  static table = 'dolares'

  static timestamps = true

  static fields: any = {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    precio: { type: DataTypes.DECIMAL, precision: 2 },
    fecha: DataTypes.TIMESTAMP,
    id_proveedor: DataTypes.INTEGER
  }

  static proveedor() {
    return this.hasOne(Proveedor)
  }
}

export { Dolar }
