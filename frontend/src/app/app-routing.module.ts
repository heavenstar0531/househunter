// default moduli i komponente
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// dodate komponente
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },  // na praznoj putanji ce se iscrtavati login komponenta
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
