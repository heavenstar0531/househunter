// app moduli i komponente
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';
// two way data binding za forme, http client, bootstrap i translate moduli
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'xng-breadcrumb';

// servisi
import { AccService } from './services/acc/acc.service';

// (gst) stranice
// (usr) stranice
// (agn) stranice
// (adm) stranice

// komponente
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    // (gst) stranice
    // (usr) stranice
    // (agn) stranice
    // (adm) stranice
    // komponente
    LoginModalComponent,
    RegisterModalComponent,
    NavbarComponent,
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
