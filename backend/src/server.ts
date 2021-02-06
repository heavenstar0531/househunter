import { environment } from './environments/environment';
import express from 'express';
import mongoose from 'mongoose';        // pojednostavljuje pristup mongo bazi
import cors from 'cors';                // omogucava koriscenje cross origin sharing-a
import bodyParser from 'body-parser';   // citanje i upis podataka u json formatu u message body

// shorthand notacija za express biblioteku i express ruter
const app = express();
const router = express.Router();

// omogucava cross origin sharing izmedju node backend-a i angular frontend-a (jer su razliciti domeni na kojima rade frontend i backend)
app.use( cors() );
// omogucava citanje podataka iz tela zahteva u json formatu
app.use( bodyParser.json() );
// omogucava koriscenje express rutera na root putanji
app.use( '/', router );


// povezivanje na mongo bazu podataka
mongoose.connect(environment.mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true, });
mongoose.connection.once('open', () => console.log(`Open connection to mongo on '${environment.mongoUrl}'`));
// pokretanje express servera na datom portu
app.listen(environment.serverPort, () => console.log(`Express server running on port ${environment.serverPort}`));


