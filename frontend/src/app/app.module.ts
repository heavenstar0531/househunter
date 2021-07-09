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


// components - pages
import { AgencyPageComponent } from './pages/agency-page/agency-page.component';
import { PropertyListPageComponent } from './pages/property-list-page/property-list-page.component';
import { PropertyPageComponent } from './pages/property-page/property-page.component';
import { ConversationListPageComponent } from './pages/conversation-list-page/conversation-list-page.component';
import { MyAccountPageComponent } from './pages/my-account-page/my-account-page.component';


// components
import { NavbarComponent } from './components/navbar/navbar.component';
import { AgencyInfoComponent } from './components/agency-info/agency-info.component';
import { PropertyStatsComponent } from './components/property-stats/property-stats.component';
import { PropertyPromotedComponent } from './components/property-promoted/property-promoted.component';
// components - lists
import { UserListComponent } from './components/user-list/user-list.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { MessageListComponent } from './components/message-list/message-list.component';
// components - modals
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { AccountModalComponent } from './components/account-modal/account-modal.component';
import { PropertyRentModalComponent } from './components/property-rent-modal/property-rent-modal.component';
import { PropertyBuyModalComponent } from './components/property-buy-modal/property-buy-modal.component';


// components - forms
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { AccountFormComponent } from './forms/account-form/account-form.component';
import { PropertyFormComponent } from './forms/property-form/property-form.component';
import { PropertyRentFormComponent } from './forms/property-rent-form/property-rent-form.component';
import { PropertyBuyFormComponent } from './forms/property-buy-form/property-buy-form.component';


// services
import { AgncyService } from './services/agncy/agncy.service';
import { AccService } from './services/acc/acc.service';
import { PropService } from './services/prop/prop.service';
import { ConvService } from './services/conv/conv.service';   // ------------- <<< last one


@NgModule({
  declarations: [
    AppComponent,
    // components - pages
    AgencyPageComponent,
    PropertyListPageComponent,
    PropertyPageComponent,
    ConversationListPageComponent,
    MyAccountPageComponent,
    
    // components
    NavbarComponent,
    AgencyInfoComponent,
    PropertyStatsComponent,
    PropertyPromotedComponent,
    // components - lists
    UserListComponent,
    PropertyListComponent,
    ConversationListComponent,
    MessageListComponent,
    // components - modals
    LoginModalComponent,
    RegisterModalComponent,
    AccountModalComponent,
    PropertyRentModalComponent,
    PropertyBuyModalComponent,

    // components - forms
    LoginFormComponent,
    AccountFormComponent,
    PropertyFormComponent,
    PropertyRentFormComponent,
    PropertyBuyFormComponent,   // ------------- <<< last one
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
    AgncyService,
    AccService,
    PropService,
    ConvService,   // ------------- <<< last one
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
