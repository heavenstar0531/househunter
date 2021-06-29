// router moduli i komponente
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// (usr) komponente
import { PocetnaComponent } from './components/pages/pocetna/pocetna.component';
import { StudiranjeComponent } from './components/pages/studiranje/studiranje.component';
import { IstrazivanjaComponent } from './components/pages/istrazivanja/istrazivanja.component';
import { ProjektiComponent } from './components/pages/projekti/projekti.component';
import { PonudeComponent } from './components/pages/ponude/ponude.component';
import { KontaktComponent } from './components/pages/kontakt/kontakt.component';
import { ZaposleniComponent } from './components/pages/zaposleni/zaposleni.component';
import { ZaposlenComponent } from './components/pages/zaposlen/zaposlen.component';
import { ProfilComponent } from './components/pages/profil/profil.component';
// (st) komponente
import { PredmetStComponent } from './components/pages/predmet-st/predmet-st.component';
// (em) komponente
import { PredmetiEmComponent } from './components/pages/predmeti-em/predmeti-em.component';
import { PredmetEmComponent } from './components/pages/predmet-em/predmet-em.component';
import { ObavestenjaEmComponent } from './components/pages/obavestenja-em/obavestenja-em.component';
import { PrijaveEmComponent } from './components/pages/prijave-em/prijave-em.component';
// (adm) komponente
import { KorisniciAdmComponent } from './components/pages/korisnici-adm/korisnici-adm.component';
import { KorisnikAdmComponent } from './components/pages/korisnik-adm/korisnik-adm.component';

// rute u aplikaciji
let appRoutes: Routes = [
  // ____________________________________________________________________________________________________
  // stranice (usr, st)
  { path: 'pocetna',        component: PocetnaComponent,       data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Početna',      } } },             // sadrzi i obavestenja
  { path: 'studiranje',     component: StudiranjeComponent,    data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Studiranje',   } }, children: [   // sadrzi filter za tip studija -- osnovne/master, si/rti/ostali
    { path: ':crsid',       component: PredmetStComponent,     data: { 'acctype': ['st'],       'breadcrumb': { 'alias': ':crsname',     } } },             // accordion informacije, predavanja, vezbe, lab, domaci, projekat, ispit;   desno obavestenja i prijave za obaveze
  ]},
  { path: 'nauka',          component: IstrazivanjaComponent,  data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Nauka'         } }, children: [   // istrazivanja -- stranica sa statickim linkovima
    { path: 'projekti',     component: ProjektiComponent,      data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Projekti',     } } },             // stranica sa statickim linkovima
    { path: 'ponude',       component: PonudeComponent,        data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Ponude',       } } },             // stranica sa statickim tekstom
  ]},
  { path: 'kontakt',        component: KontaktComponent,       data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Kontakt',      } }, children: [   // stranica sa statickim tekstom
    { path: 'zaposleni',    component: ZaposleniComponent,     data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Zaposleni',    } }, children: [
      { path:':accid',      component: ZaposlenComponent,      data: { 'acctype': ['usr','st'], 'breadcrumb': { 'alias': ':prsnname',    } } },
    ]},
  ]},
  
  // stranice (em)
  { path: 'predmeti',       component: PredmetiEmComponent,    data: { 'acctype': ['em'], 'breadcrumb': { 'label': 'Predmeti',     } }, children: [         // lista predmeta na kojima je zaposleni angazovan
    { path: ':crsid',       component: PredmetEmComponent,     data: { 'acctype': ['em'], 'breadcrumb': { 'alias': ':crsname',     } } },                   // accordion informacije, predavanja, vezbe, lab, domaci, projekat, ispit
  ]},
  { path: 'obavestenja',    component: ObavestenjaEmComponent, data: { 'acctype': ['em'], 'breadcrumb': { 'label': 'Obaveštenja',  } } },
  { path: 'prijave',        component: PrijaveEmComponent,     data: { 'acctype': ['em'], 'breadcrumb': { 'label': 'Prijave',      } } },                   // otvaranje prijava za labove, projekte, itd.

  // stranice (adm)
  { path: 'korisnici',      component: KorisniciAdmComponent,  data: { 'acctype': ['adm'], 'breadcrumb': { 'label': 'Korisnici',   } }, children: [         // lista korisnika prema tipu;   ovde moze da se napravi grupa studenata
    { path: ':accid',       component: KorisnikAdmComponent,   data: { 'acctype': ['adm'], 'breadcrumb': { 'alias': ':prsnname',   } } },                   // admin ne moze da obrise svoj nalog!
  ]},

  // stranice (usr, st, adm)
  { path: 'profil',         component: ProfilComponent,        data: { 'acctype': ['st','em','adm'], 'breadcrumb': { 'label': 'Profil',    } } },           // za sve ulogovane korisnike (sve osim usr)

  // ____________________________________________________________________________________________________
  // putanje koje ne treba da se nadju u navbar-u
  { path: '**', redirectTo: '/pocetna' },                                                                                                                   // default putanja
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// uklanjanje putanja koje ne treba da se nadju u navbar-u
appRoutes = JSON.parse( JSON.stringify( appRoutes ) );
appRoutes.pop();
export { appRoutes };



