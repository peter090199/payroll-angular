import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUiComponent } from './dashboard-ui/dashboard-ui.component';
import { EmployeesComponent } from './Files/components/employees/employees.component';



const routes: Routes = [

  { path: 'dashboard',component: DashboardUiComponent},
  { path: 'files/employees',component: EmployeesComponent},
  // { path: 'files/clients',component: ClientsUIComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
