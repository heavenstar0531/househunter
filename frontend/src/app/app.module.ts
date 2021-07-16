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
// https://www.npmjs.com/package/xng-breadcrumb
import { BreadcrumbModule } from 'xng-breadcrumb';

// https://www.npmjs.com/package/buffer
/* implements node buffer type*/

// https://www.npmjs.com/package/bootstrap
/* bootstrap */
// https://icons.getbootstrap.com/
/* bootstrap icon library */
// https://www.npmjs.com/package/@popperjs/core
/* used for precise popovers */

// https://www.npmjs.com/package/c3
// +   https://c3js.org/examples.html
/* C3.js graph library */


// components - pages
import { NavbarComponent } from './components/pages/navbar/navbar.component';
import { AgencyPageComponent } from './components/pages/agency-page/agency-page.component';
import { PropertyListPageComponent } from './components/pages/property-list-page/property-list-page.component';
import { PropertyPageComponent } from './components/pages/property-page/property-page.component';
import { ConversationListPageComponent } from './components/pages/conversation-list-page/conversation-list-page.component';
import { MyAccountPageComponent } from './components/pages/my-account-page/my-account-page.component';

// components - lists
import { UserListComponent } from './components/lists/user-list/user-list.component';
import { PropertyListComponent } from './components/lists/property-list/property-list.component';
import { ConversationListComponent } from './components/lists/conversation-list/conversation-list.component';
import { MessageListComponent } from './components/lists/message-list/message-list.component';
import { PropertyStatsComponent } from './components/lists/property-stats/property-stats.component';
import { PropertyPromotedComponent } from './components/lists/property-promoted/property-promoted.component';

// components - modals
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/modals/register-modal/register-modal.component';
import { AccountModalComponent } from './components/modals/account-modal/account-modal.component';
import { PropertyRentModalComponent } from './components/modals/property-rent-modal/property-rent-modal.component';
import { PropertyBuyModalComponent } from './components/modals/property-buy-modal/property-buy-modal.component';
// components - forms
import { AgencyInfoComponent } from './components/forms/agency-info/agency-info.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { AccountFormComponent } from './components/forms/account-form/account-form.component';
import { PropertyFormComponent } from './components/forms/property-form/property-form.component';
import { PropertyRentFormComponent } from './components/forms/property-rent-form/property-rent-form.component';
import { PropertyBuyFormComponent } from './components/forms/property-buy-form/property-buy-form.component';


// services
import { AgncyService } from './services/agncy/agncy.service';
import { AccService } from './services/acc/acc.service';
import { PropService } from './services/prop/prop.service';
import { ConvService } from './services/conv/conv.service';
import { FileService } from './services/file/file.service';
import { SeshService } from './services/sesh/sesh.service';   // ------------- <<< last one


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
    ConvService,
    FileService,
    SeshService,   // ------------- <<< last one
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
