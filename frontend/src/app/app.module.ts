// app modules and components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';
// two-way data binding for forms, http client, bootstrap and breadcrumb modules
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'xng-breadcrumb';
// (gst) pages
// (usr) pages
// (agn) pages
// (adm) pages
// services
import { AccService } from './services/acc/acc.service';

// components
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    // (gst) pages
    // (usr) pages
    // (agn) pages
    // (adm) pages
    // components
    LoginModalComponent,
    RegisterModalComponent,
    NavbarComponent,
  ],
  imports: [
    // app modules and components
    BrowserModule,
    AppRoutingModule,
    // two-way data binding for forms, http client, bootstrap and breadcrumb modules
    FormsModule,
    HttpClientModule,
    NgbModule,
    BreadcrumbModule,
  ],
  providers: [AccService, NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
