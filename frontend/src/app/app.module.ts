// app moduli i komponente
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
// two way data binding za forme, http client, bootstrap i translate moduli
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'xng-breadcrumb';

// servisi
import { AccService } from './services/acc/acc.service';

// (usr) stranice
import { PocetnaComponent } from './components/pages/pocetna/pocetna.component';
import { StudiranjeComponent } from './components/pages/studiranje/studiranje.component';
import { IstrazivanjaComponent } from './components/pages/istrazivanja/istrazivanja.component';
import { ProjektiComponent } from './components/pages/projekti/projekti.component';
import { PonudeComponent } from './components/pages/ponude/ponude.component';
import { KontaktComponent } from './components/pages/kontakt/kontakt.component';
import { ZaposleniComponent } from './components/pages/zaposleni/zaposleni.component';
import { ZaposlenComponent } from './components/pages/zaposlen/zaposlen.component';
import { ProfilComponent } from './components/pages/profil/profil.component';
// (st) stranice
import { PredmetStComponent } from './components/pages/predmet-st/predmet-st.component';
// (em) stranice
import { PredmetiEmComponent } from './components/pages/predmeti-em/predmeti-em.component';
import { PredmetEmComponent } from './components/pages/predmet-em/predmet-em.component';
import { ObavestenjaEmComponent } from './components/pages/obavestenja-em/obavestenja-em.component';
import { PrijaveEmComponent } from './components/pages/prijave-em/prijave-em.component';
// (adm) stranice
import { KorisniciAdmComponent } from './components/pages/korisnici-adm/korisnici-adm.component';
import { KorisnikAdmComponent } from './components/pages/korisnik-adm/korisnik-adm.component';

// delovi
import { LoginModalComponent } from './components/parts/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/parts/register-modal/register-modal.component';
import { NavbarComponent } from './components/parts/navbar/navbar.component';
import { CrsPageComponent } from './components/parts/crs-page/crs-page.component';
import { CrsInfoComponent } from './components/parts/crs-info/crs-info.component';

@NgModule({
  declarations: [
    AppComponent,
    // (usr) stranice
    PocetnaComponent,
    StudiranjeComponent,
    IstrazivanjaComponent,
    ProjektiComponent,
    PonudeComponent,
    KontaktComponent,
    ZaposleniComponent,
    ZaposlenComponent,
    ProfilComponent,
    // (st) stranice
    PredmetStComponent,
    // (em) stranice
    PredmetiEmComponent,
    PredmetEmComponent,
    ObavestenjaEmComponent,
    PrijaveEmComponent,
    // (adm) stranice
    KorisniciAdmComponent,
    KorisnikAdmComponent,
    // delovi
    LoginModalComponent,
    RegisterModalComponent,
    NavbarComponent,
    CrsPageComponent,
    CrsInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // importovani moduli
    FormsModule,
    HttpClientModule,
    NgbModule,
    BreadcrumbModule,
  ],
  providers: [AccService, NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
