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

// route guard
import { RouteGuard } from './util/route.guard';


// application routes
let appRoutes: Routes = [
  // ____________________________________________________________________________________________________
  // pages
  { path: 'aaa',        component: PropertyFormComponent,          data: { acc_type: { adm:0,                      }, breadcrumb: { label: 'AAAAA'       } },  canActivate: [ RouteGuard ], },   // TODO: remove
  { path: 'agencija',   component: AgencyPageComponent,            data: { acc_type: { adm:0,                      }, breadcrumb: { label: 'Agencija',   } },  canActivate: [ RouteGuard ], },
  { path: 'nekretnine', component: PropertyListPageComponent,      data: { acc_type: { adm:0, agn:1, usr:2, gst:3, }, breadcrumb: { label: 'Nekretnine', } },  canActivate: [ RouteGuard ], children: [
    { path: ':prop_id', component: PropertyPageComponent,          data: { acc_type: { adm:0, agn:1, usr:2,        }, breadcrumb: { alias: ':prop_name', } },  canActivate: [ RouteGuard ], },
  ]},
  { path: 'poruke',     component: ConversationListPageComponent,  data: { acc_type: { adm:0, agn:1, usr:2,        }, breadcrumb: { label: 'Poruke',     } },  canActivate: [ RouteGuard ], },
  { path: 'moj-nalog',  component: MyAccountPageComponent,         data: { acc_type: { adm:0, agn:1, usr:2,        }, breadcrumb: { label: 'Nalog',      } },  canActivate: [ RouteGuard ], },

  // ____________________________________________________________________________________________________
  // miscellaneous paths that shouldn't be visible in the navbar
  { path: '',   redirectTo: 'nekretnine', pathMatch: 'full',       data: {                                            breadcrumb: { label: 'HH',         } }, },
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
appRoutes.pop();
export { appRoutes };



