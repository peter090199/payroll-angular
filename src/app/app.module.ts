import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderPageComponent } from './header-page/header-page.component';

import {ToastrModule} from 'ngx-toastr';
import { MaterialModule } from 'src/Material/Material.module';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FooterPageComponent } from './footer-page/footer-page.component';
import { DashboardUiComponent } from './dashboard-ui/dashboard-ui.component';
import { EmployeesUIComponent } from './Files/componentsUI/employees-ui/employees-ui.component';
import { EmployeesComponent } from './Files/components/employees/employees.component';
import { ClientsComponent } from './Files/components/clients/clients.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { EditEmployeeComponent} from './Files/componentsUI/edit-employees/edit-employee-component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    FooterPageComponent,
    DashboardUiComponent,
    EmployeesUIComponent,
    EmployeesUIComponent,
    EmployeesComponent,
    ClientsComponent,
    LoginComponent,
    RegisterComponent,
    EditEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ToastrModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,


    

  ],
  providers: [DatePipe, JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
