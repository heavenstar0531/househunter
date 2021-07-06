// router modules and components
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// (gst) pages
// (usr) pages
// (agn) pages
// (adm) pages

// application routes
let appRoutes: Routes = [
  // ____________________________________________________________________________________________________
  // stranice (usr, st)
  // { path: 'pocetna',        component: PocetnaComponent,       data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Početna',      } } },             // sadrzi i obavestenja
  // { path: 'studiranje',     component: StudiranjeComponent,    data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Studiranje',   } }, children: [   // sadrzi filter za tip studija -- osnovne/master, si/rti/ostali
  //   { path: ':crsid',       component: PredmetStComponent,     data: { 'acctype': ['st'],       'breadcrumb': { 'alias': ':crsname',     } } },             // accordion informacije, predavanja, vezbe, lab, domaci, projekat, ispit;   desno obavestenja i prijave za obaveze
  // ]},
  // { path: 'nauka',          component: IstrazivanjaComponent,  data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Nauka'         } }, children: [   // istrazivanja -- stranica sa statickim linkovima
  //   { path: 'projekti',     component: ProjektiComponent,      data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Projekti',     } } },             // stranica sa statickim linkovima
  //   { path: 'ponude',       component: PonudeComponent,        data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Ponude',       } } },             // stranica sa statickim tekstom
  // ]},
  // { path: 'kontakt',        component: KontaktComponent,       data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Kontakt',      } }, children: [   // stranica sa statickim tekstom
  //   { path: 'zaposleni',    component: ZaposleniComponent,     data: { 'acctype': ['usr','st'], 'breadcrumb': { 'label': 'Zaposleni',    } }, children: [
  //     { path:':accid',      component: ZaposlenComponent,      data: { 'acctype': ['usr','st'], 'breadcrumb': { 'alias': ':prsnname',    } } },
  //   ]},
  // ]},
  
  // stranice (em)
  // { path: 'predmeti',       component: PredmetiEmComponent,    data: { 'acctype': ['em'], 'breadcrumb': { 'label': 'Predmeti',     } }, children: [         // lista predmeta na kojima je zaposleni angazovan
  //   { path: ':crsid',       component: PredmetEmComponent,     data: { 'acctype': ['em'], 'breadcrumb': { 'alias': ':crsname',     } } },                   // accordion informacije, predavanja, vezbe, lab, domaci, projekat, ispit
  // ]},
  // { path: 'obavestenja',    component: ObavestenjaEmComponent, data: { 'acctype': ['em'], 'breadcrumb': { 'label': 'Obaveštenja',  } } },
  // { path: 'prijave',        component: PrijaveEmComponent,     data: { 'acctype': ['em'], 'breadcrumb': { 'label': 'Prijave',      } } },                   // otvaranje prijava za labove, projekte, itd.

  // stranice (adm)
  // { path: 'korisnici',      component: KorisniciAdmComponent,  data: { 'acctype': ['adm'], 'breadcrumb': { 'label': 'Korisnici',   } }, children: [         // lista korisnika prema tipu;   ovde moze da se napravi grupa studenata
  //   { path: ':accid',       component: KorisnikAdmComponent,   data: { 'acctype': ['adm'], 'breadcrumb': { 'alias': ':prsnname',   } } },                   // admin ne moze da obrise svoj nalog!
  // ]},

  // stranice (usr, st, adm)
  // { path: 'profil',         component: ProfilComponent,        data: { 'acctype': ['st','em','adm'], 'breadcrumb': { 'label': 'Profil',    } } },           // za sve ulogovane korisnike (sve osim usr)

  // ____________________________________________________________________________________________________
  // miscellaneous paths that should't be visible in the navbar
  { path: '**', redirectTo: '/pocetna' },                                                                                                                   // default putanja
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// remove paths that should't be visible in the navbar
// +   deep copy the app routes object first before exporting
appRoutes = JSON.parse( JSON.stringify( appRoutes ) );
appRoutes.pop();
export { appRoutes };



