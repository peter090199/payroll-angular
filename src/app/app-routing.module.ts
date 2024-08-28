import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUiComponent } from './dashboard-ui/dashboard-ui.component';
import { EmployeesComponent } from './Files/components/employees/employees.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProtectedComponent } from './protected/protected.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { ClientsComponent } from './Files/components/clients/clients.component';
import { UserRoleComponent } from './Users/user-role/components/user-role.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent }, // Accessible to everyone
  { path: 'login', component: LoginComponent }, // Accessible to everyone

  // Protected route
  { path: 'protected-route', component: ProtectedComponent, canActivate: [AuthGuard] },

  // Route with header component that needs authentication
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'header',
        component: HeaderPageComponent,
        children: [
          { path: 'dashboard', component: DashboardUiComponent },
          { path: 'files/employees', component: EmployeesComponent },
          { path: 'files/clients', component: ClientsComponent },
          { path: 'user/role', component: UserRoleComponent },
        ]
      }
    ]
  },
  
  // Wildcard route for a 404 page
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
