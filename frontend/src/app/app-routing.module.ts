// router modules and components
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components - pages
import { AgencyPageComponent } from './components/pages/agency-page/agency-page.component';
import { PropertyListPageComponent } from './components/pages/property-list-page/property-list-page.component';
import { PropertyPageComponent } from './components/pages/property-page/property-page.component';
import { ConversationListPageComponent } from './components/pages/conversation-list-page/conversation-list-page.component';
import { MyAccountPageComponent } from './components/pages/my-account-page/my-account-page.component';
import { PropertyFormComponent } from './components/forms/property-form/property-form.component';


// application routes
let appRoutes: Routes = [
  // ____________________________________________________________________________________________________
  // pages
  { path: '',   component: PropertyFormComponent,            data: { 'acctype': ['adm'],                   'breadcrumb': { 'label': 'Agencija',   } } },   // TODO: remove
  { path: 'agencija',   component: AgencyPageComponent,            data: { 'acctype': ['adm'],                   'breadcrumb': { 'label': 'Agencija',   } } },
  { path: 'nekretnine', component: PropertyListPageComponent,      data: { 'acctype': ['adm','agn','usr','gst'], 'breadcrumb': { 'label': 'Nekretnine', } }, children: [
    { path: ':prop_id', component: PropertyPageComponent,          data: { 'acctype': ['adm','agn','usr'],       'breadcrumb': { 'alias': ':prop_name', } } },
  ]},
  { path: 'poruke',     component: ConversationListPageComponent,  data: { 'acctype': ['adm','agn','usr'],       'breadcrumb': { 'label': 'Poruke',     } } },
  { path: 'moj-nalog',  component: MyAccountPageComponent,         data: { 'acctype': ['adm','agn','usr'],       'breadcrumb': { 'label': 'Nalog',      } } },

  // ____________________________________________________________________________________________________
  // miscellaneous paths that shouldn't be visible in the navbar
  { path: '**', redirectTo: 'nekretnine' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// remove paths that should't be visible in the navbar
// +   deep copy the app routes object first before exporting
// +   the result is not! a Routes object, instead it is just a plain old javascript object
// +   https://stackoverflow.com/questions/5873624/parse-json-string-into-a-particular-object-prototype-in-javascript
// +   Object.assign( new Foo, { a: 1 } )
appRoutes = JSON.parse( JSON.stringify( appRoutes ) );
appRoutes.pop();
export { appRoutes };



