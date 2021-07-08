// app modules and components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
// two-way data binding for forms, http client, bootstrap and breadcrumb modules
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap
// +   https://ng-bootstrap.github.io/#/components/nav/examples
// +   https://ng-bootstrap.github.io/#/components/dropdown/examples
// +   https://ng-bootstrap.github.io/#/components/buttons/examples
// +   https://ng-bootstrap.github.io/#/components/modal/examples
// +   https://ng-bootstrap.github.io/#/components/toast/examples
// +   https://ng-bootstrap.github.io/#/components/datepicker/overview
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'xng-breadcrumb';
// https://c3js.org/examples.html
/* C3.js graph library */
// https://icons.getbootstrap.com/
/* bootstrap icon library */

// pages

// components
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// services
import { AccService } from './services/acc/acc.service';
import { AgncyService } from './services/agncy/agncy.service';
import { ConvService } from './services/conv/conv.service';
import { PropService } from './services/prop/prop.service';


@NgModule({
  declarations: [
    AppComponent,
    // pages
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
  providers: [
    // bootstrap modal
    NgbActiveModal,
    // services
    AccService,
    AgncyService,
    ConvService,
    PropService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
