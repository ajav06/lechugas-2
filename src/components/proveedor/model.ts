import { DataTypes, Model } from 'https://deno.land/x/denodb/mod.ts'
import { Dolar } from '../dolar/model.ts'

class Proveedor extends Model {
  static table = 'proveedores'

  static timestamps = true

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING,
    url: DataTypes.STRING,
    img: DataTypes.STRING,
    activo: DataTypes.BOOLEAN
  }

  static dolares() {
    return this.hasMany(Dolar)
  }
}

export { Proveedor }
