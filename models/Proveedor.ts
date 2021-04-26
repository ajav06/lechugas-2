import { DataTypes, Model, Relationships } from 'https://deno.land/x/denodb/mod.ts';
import Dolar from '../models/Dolar.ts';
import db from '../db/db.ts';

class Proveedor extends Model {
    static table = 'proveedores';
  
    static timestamps = true;
  
    static fields = {
      id: {
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      img: DataTypes.STRING,
      activo: DataTypes.BOOLEAN,
    };

    static dolar() {
        return this.hasMany(Dolar);
      }
}

Relationships.belongsTo(Proveedor, Dolar);

db.link([Proveedor]);

export default Proveedor;