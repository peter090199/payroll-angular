import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUiComponent } from './dashboard-ui/dashboard-ui.component';
import { EmployeesUiComponent } from './Files/employees-ui/employees-ui.component';
import { ClientsUiComponent } from './Files/clients-ui/clients-ui.component';
import { BranchesUiComponent } from './Files/branches-ui/branches-ui.component';
const routes: Routes = [

  { path: 'dashboard',component: DashboardUiComponent},
  { path: 'files/employees',component: EmployeesUiComponent},
  { path: 'files/clients',component: ClientsUiComponent},
  { path: 'files/branches',component: BranchesUiComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
