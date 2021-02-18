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
export const appRoutes: Routes = [
// ____________________________________________________________________________________________________
// stranice (usr, st, adm)
  { path: 'pocetna',        component: PocetnaComponent,       data: { 'breadcrumb': { 'label': 'Početna',      } }, },            // sadrzi i obavestenja
  { path: 'studiranje',     component: StudiranjeComponent,    data: { 'breadcrumb': { 'label': 'Studiranje',   } }, children: [   // sadrzi filter za tip studija -- osnovne/master, si/rti/ostali
    { path: ':crsid',       component: PredmetStComponent,     data: { 'breadcrumb': { 'alias': ':crsname',     } } },             // accordion informacije, predavanja, vezbe, lab, domaci, projekat, ispit;   desno obavestenja i prijave za obaveze
  ]},
  { path: 'nauka',        /*component: null,*/                 data: { 'breadcrumb': { 'label': 'Nauka',        } }, children: [   // ne postoji ova stranica, tako da ne moze da se klikne u navbar-u
    { path: 'istrazivanja', component: IstrazivanjaComponent,  data: { 'breadcrumb': { 'label': 'Istraživanja', } } },             // stranica sa statickim linkovima
    { path: 'projekti',     component: ProjektiComponent,      data: { 'breadcrumb': { 'label': 'Projekti',     } } },             // stranica sa statickim linkovima
    { path: 'ponude',       component: PonudeComponent,        data: { 'breadcrumb': { 'label': 'Ponude',       } } },             // stranica sa statickim tekstom
  ]},
  { path: 'kontakt',        component: KontaktComponent,       data: { 'breadcrumb': { 'label': 'Kontakt',      } }, children: [   // stranica sa statickim tekstom
    { path: 'zaposleni',    component: ZaposleniComponent,     data: { 'breadcrumb': { 'label': 'Zaposleni',    } }, children: [
      { path:':accid',      component: ZaposlenComponent,      data: { 'breadcrumb': { 'alias': ':prsnname',    } } },
    ]},
  ]},
  { path: 'profil',         component: ProfilComponent,        data: { 'breadcrumb': { 'label': 'Profil',       } } },             // za sve ulogovane korisnike (sve osim usr)

// ____________________________________________________________________________________________________
// stranice (em)
  { path: 'predmeti',       component: PredmetiEmComponent,    data: { 'breadcrumb': { 'label': 'Predmeti',     } }, children: [   // lista predmeta na kojima je zaposleni angazovan
    { path: ':crsid',       component: PredmetEmComponent,     data: { 'breadcrumb': { 'alias': ':crsid',       } } },             // accordion informacije, predavanja, vezbe, lab, domaci, projekat, ispit
  ]},
  { path: 'obavestenja',    component: ObavestenjaEmComponent, data: { 'breadcrumb': { 'label': 'Obaveštenja',  } } },
  { path: 'prijave',        component: PrijaveEmComponent,     data: { 'breadcrumb': { 'label': 'Prijave',      } } },             // otvaranje prijava za labove, projekte, itd.

// ____________________________________________________________________________________________________
// stranice (adm)
  { path: 'korisnici',      component: KorisniciAdmComponent,  data: { 'breadcrumb': { 'label': 'Korisnici',    } }, children: [   // lista korisnika prema tipu;   ovde moze da se napravi grupa studenata
    { path: ':accid',       component: KorisnikAdmComponent,   data: { 'breadcrumb': { 'alias': ':accid',       } } },             // admin ne moze da obrise svoj nalog!
  ]},

// ____________________________________________________________________________________________________
// redirekcije
  { path: '**', redirectTo: '/pocetna' },                                                                         // default putanja
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
