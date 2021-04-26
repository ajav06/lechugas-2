import {
  DataTypes,
  Model,
  Relationships
} from 'https://deno.land/x/denodb/mod.ts'
import { db } from '../../services/postgresql.ts'
import { Proveedor } from '../proveedor/model.ts'

class Dolar extends Model {
  static table = 'dolares'

  static timestamps = true

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    precio: DataTypes.DECIMAL,
    fecha: DataTypes.TIMESTAMP
  }

  static proveedor() {
    return this.hasOne(Proveedor)
  }
}

db.link([Dolar])

export { Dolar }
