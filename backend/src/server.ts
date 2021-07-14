import { environment } from "./environments/environment";

// https://www.npmjs.com/package/express
// +   https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
import express from "express";
// https://www.npmjs.com/package/mongoose
// +   https://docs.mongodb.com/manual/reference/sql-comparison/
// +   https://docs.mongodb.com/manual/tutorial/query-documents/
import mongoose from "mongoose";
// https://www.npmjs.com/package/cors
import cors from "cors";
// https://www.npmjs.com/package/express-session
import session from "express-session";
// https://www.npmjs.com/package/connect-mongo
import MongoStore from "connect-mongo";
// https://www.npmjs.com/package/gridfs-stream
import Grid from "gridfs-stream";

// https://www.npmjs.com/package/bson-objectid
/* implements only object id from mongodb */

// https://www.npmjs.com/package/concurrently
/* run nodemon and tsc at the same time */
// https://www.npmjs.com/package/nodemon
/* watch for file changes in node */

// rest apis
import { AgncyApi } from "./app/rest-api/agncy.api";
import { AccApi } from "./app/rest-api/acc.api";
import { ConvApi } from "./app/rest-api/conv.api";
import { PropApi } from "./app/rest-api/prop.api";
import { FileApi } from "./app/rest-api/file.api";


// the main function
async function main() {
    // express app and router
    const app = express();
    const router = express.Router();


    // use the express router
    app.use( router );
    // use cross-origin sharing between the express backend and angular frontend (since the domains are different)
    app.use( cors() );

    // set that all requests' bodies are read as json
    app.use( express.json() );
    // enable the session store for mongodb
    app.use( session({
        store: MongoStore.create({
            mongoUrl: environment.mongoUrl,
            ttl: environment.sessionTtl,
        }),
        secret: environment.sessionSecret, // used for session encryption?
        saveUninitialized: false, // prevents an uninitialized session to be saved to the session store
        resave: false, // prevents an unmodified session (in a request) to be resaved to the session store
    }) );

    // set the mongoose promise to be the global promise
    mongoose.Promise = global.Promise;
    
    try
    {
        // wait for the mongo connection to be established
        await mongoose.connect( environment.mongoUrl, {
            useUnifiedTopology: true,   // ???
            useNewUrlParser: true,   // the old url parser is deprecated
        });
        
        console.log( `[info] Open connection to MongoDB on path '${environment.mongoUrl}'` );
    }
    catch( err )
    {
        console.error( `[error] Failed to connect to MongoDB on path '${environment.mongoUrl}'`, err );
        process.kill( process.pid, 'SIGTERM' );
        return;
    }
    
    // enables files larger than 16MB to be saved in mongo
    // set the gridfs's mongo driver to be the mongoose's mongo driver
    const gfs = Grid( mongoose.connection.db, mongoose.mongo );

    AgncyApi.register( router );
    AccApi.register( router );
    ConvApi.register( router );
    PropApi.register( router );
    FileApi.register( router, gfs );
    
    // start the express server
    app.listen( environment.expressPort, () =>
        console.log(`[info] Express server running on port ${environment.expressPort}`)
    );
}

// call the main function
main();
