import express from 'express';
import mongoose from 'mongoose';        // olaksava pristup mongo bazi
import cors from 'cors';                // omogucava koriscenje cross origin sharing-a
import bodyParser from 'body-parser';   // citanje podataka iz zahteva od frontend-a
import user from './app/models/user';
import news from './app/models/news';

// shorthand notacija za express biblioteku i express ruter
const app = express();
const router = express.Router();

// omogucava cross origin sharing izmedju node backend-a i angular frontend-a (jer su razliciti domeni na kojima rade frontend i backend)
app.use( cors() );
// omogucava citanje podataka iz tela zahteva u json formatu
app.use( bodyParser.json() );
// koristimo ruter na root putanji
app.use( '/', router );


// povezivanje na bazu podataka -- protokol, putanja, naziv baze
mongoose.connect('mongodb://localhost:27017/mydb', { useUnifiedTopology: true, useNewUrlParser: true, });
// uzimanje connection objekta iz trenutne konekcije
const conn = mongoose.connection;
// logovanje da je konekcija uspesna
conn.once('open', () => console.log('Open connection to mongodb'));


// kada dodje ova ruta, gadja se ova funkcionalnost naseg rest api-ja
// +   ovoj ruti moze da stigne samo post zahtev
// +   takodje se navodi i funkcija koja vraca response na osnovu request-a
router.route('/login').post( (req, res) => {
    // uzimanje username-a i password-a iz tela post zahteva
    let username = req.body.username;
    let password = req.body.password;

    // nadji jednog! user-a iz mongo baze sa datim parametrima
    // +   takodje se dodaje funkcija kojoj je dat error objekat ako je doslo do greske, i sam user ako je pronadjen
    user.findOne({ 'username': username, 'password': password }, (err: any, user: any) => {
        // ako nema greske, dodati user-a u json response
        if( err ) { console.log( err ); return; }
        res.json( user );
    });
});

router.route('/register').post( (req, res) => {
    // uzimanje username-a i password-a iz tela post zahteva
    let usr = new user( req.body );

    // cuvanje usera u mongu i vracanje statusa operacije
    usr.save().then ( _ => res.status(200).json({'user': 'ok' }) )
              .catch( _ => res.status(400).json({'user': 'err'}) );
});

router.route('/news').get( (req, res) => {
    // trazi sve elemente po kriterijumu koji je prazan -- sve vesti
    news.find({}, (err, news) => {
        if( err ) { console.log( err ); return; }
        res.json( news );
    });
});



// pokretanje express servera na datom portu
app.listen(4000, () => console.log(`Express server running on port 4000`));
