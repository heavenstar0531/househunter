import { environment } from './environments/environment';
import express from 'express';
import mongoose from 'mongoose';        // pojednostavljuje pristup mongo bazi
import cors from 'cors';                // omogucava koriscenje cross origin sharing-a
import bodyParser from 'body-parser';   // citanje i upis podataka u json formatu u message body
// dodati modeli
import User from './app/models/user';
import News from './app/models/news';

// shorthand notacija za express biblioteku i express ruter
const app = express();
const router = express.Router();

// omogucava cross origin sharing izmedju node backend-a i angular frontend-a (jer su razliciti domeni na kojima rade frontend i backend)
app.use( cors() );
// omogucava citanje podataka iz tela zahteva u json formatu
app.use( bodyParser.json() );
// koristimo ruter na root putanji
app.use( '/', router );


// povezivanje na mongo bazu podataka
mongoose.connect(environment.mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true, });
mongoose.connection.once('open', () => console.log(`Open connection to mongo on '${environment.mongoUrl}'`));
// pokretanje express servera na datom portu
app.listen(environment.serverPort, () => console.log(`Express server running on port ${environment.serverPort}`));




router.route('/login').post( (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({ 'username': username, 'password': password }, (err: any, user: any) => {
        if( err ) { console.log( err ); return; }
        res.json( user );
    });
});

router.route('/register').post( (req, res) => {
    let usr = new User( req.body );

    usr.save().then ( _ => res.status(200).json({'user': 'ok' }) )
              .catch( _ => res.status(400).json({'user': 'err'}) );
});

router.route('/news').get( (_, res) => {
    News.find({}, (err, news) => {
        if( err ) { console.log( err ); return; }
        res.json( news );
    });
});


