// default moduli i komponente
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// two way data binding za forme, http client, bootstrap i translate moduli
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// dddate stranice komponente
import { AppComponent } from './components/app/app.component';
import { PocetnaComponent } from './components/pages/pocetna/pocetna.component';
import { IstrazivanjaComponent } from './components/pages/istrazivanja/istrazivanja.component';
import { KontaktComponent } from './components/pages/kontakt/kontakt.component';
import { ZaposleniComponent } from './components/pages/zaposleni/zaposleni.component';
import { ProfilComponent } from './components/pages/profil/profil.component';
import { StudiranjeComponent } from './components/pages/studiranje/studiranje.component';
import { ProjektiComponent } from './components/pages/projekti/projekti.component';
import { PonudeComponent } from './components/pages/ponude/ponude.component';
import { ZaposlenComponent } from './components/pages/zaposlen/zaposlen.component';
import { PredmetStComponent } from './components/pages/predmet-st/predmet-st.component';
import { PredmetEmComponent } from './components/pages/predmet-em/predmet-em.component';
import { PredmetListEmComponent } from './components/pages/predmet-list-em/predmet-list-em.component';
import { ObavestenjaEmComponent } from './components/pages/obavestenja-em/obavestenja-em.component';
import { PrijaveEmComponent } from './components/pages/prijave-em/prijave-em.component';
import { KorisnikListAdmComponent } from './components/pages/korisnik-list-adm/korisnik-list-adm.component';
import { KorisnikAdmComponent } from './components/pages/korisnik-adm/korisnik-adm.component';

// ova funkcija mora da bude eksportovana da bi mogla biti koriscena od strane translate modula kao generator translate loader-a
export function HttpLoaderFactory( http: HttpClient )
{
  return new TranslateHttpLoader( http );
}

@NgModule({
  declarations: [
    AppComponent,
    // dodate stranice komponente
    PocetnaComponent,
    IstrazivanjaComponent,
    KontaktComponent,
    ZaposleniComponent,
    ProfilComponent,
    StudiranjeComponent,
    ProjektiComponent,
    PonudeComponent,
    ZaposlenComponent,
    PredmetStComponent,
    PredmetEmComponent,
    PredmetListEmComponent,
    ObavestenjaEmComponent,
    PrijaveEmComponent,
    KorisnikListAdmComponent,
    KorisnikAdmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // dodati moduli
    FormsModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
