import { Application } from "https://deno.land/x/oak/mod.ts";
import { Database } from 'https://deno.land/x/denodb/mod.ts';
import db from "../db/db.ts";
import router from "../routes/routes.ts"

class Server {

    app : Application;
    db : Database;

    constructor(){
        this.app = new Application();
        this.routes();
        this.db = db
    }

    routes(){
        this.app.use(router.routes());
        this.app.use(router.allowedMethods());
    }

    listen(){
        this.app.listen({port:8080});
        console.log('Server running at http://localhost:8000');
    };

} 

export default Server;

