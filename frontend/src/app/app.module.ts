// app moduli i komponente
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
// two way data binding za forme, http client, bootstrap i translate moduli
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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

// ova funkcija mora da bude eksportovana da bi mogla biti koriscena od strane translate modula kao generator translate loader-a
export function HttpLoaderFactory( http: HttpClient )
{
  return new TranslateHttpLoader( http );
}

@NgModule({
  declarations: [
    AppComponent,
    // (usr) komponente
    PocetnaComponent,
    StudiranjeComponent,
    IstrazivanjaComponent,
    ProjektiComponent,
    PonudeComponent,
    KontaktComponent,
    ZaposleniComponent,
    ZaposlenComponent,
    ProfilComponent,
    // (st) komponente
    PredmetStComponent,
    // (em) komponente
    PredmetiEmComponent,
    PredmetEmComponent,
    ObavestenjaEmComponent,
    PrijaveEmComponent,
    // (adm) komponente
    KorisniciAdmComponent,
    KorisnikAdmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // importovani moduli
    FormsModule,
    HttpClientModule,
    NgbModule,
    BreadcrumbModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
