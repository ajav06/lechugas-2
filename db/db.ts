import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';

    const connector = new PostgresConnector({
      database: 'lechugas2',
      host: 'localhost',
      username: 'postgres',
      password: '05',
      port: 5432,
    });
  
    console.log('Base de datos conectada')
  const db = await new Database(connector);

export default db;

