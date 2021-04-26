import { DataTypes, Model, Relationships } from 'https://deno.land/x/denodb/mod.ts';
import Proveedor from '../models/Proveedor.ts';
import db from '../db/db.ts';
 
class Dolar extends Model {
    static table = 'dolares';
  
    static timestamps = true;
  
    static fields = {
      id: {
        primaryKey: true,
        autoIncrement: true,
      },
      precio: DataTypes.DECIMAL,
      fecha: DataTypes.TIMESTAMP,
    };

    static proveedor() {
        return this.hasOne(Proveedor);
      }
}
db.link([Dolar]);

export default Dolar;