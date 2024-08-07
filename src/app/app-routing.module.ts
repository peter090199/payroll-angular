import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUiComponent } from './dashboard-ui/dashboard-ui.component';
import { EmployeesComponent } from './Files/components/employees/employees.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  { path: 'register',component: RegisterComponent},
  { path: 'login',component: LoginComponent},
  { path: 'dashboard', component: DashboardUiComponent, canActivate: [AuthGuard] },
  { path: 'files/employees', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
  // { path: 'files/clients',component: ClientsUIComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
