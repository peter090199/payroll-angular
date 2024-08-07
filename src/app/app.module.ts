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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { DashboardUiComponent } from './dashboard-ui/dashboard-ui.component';
import { EmployeesUIComponent } from './Files/componentsUI/employees-ui/employees-ui.component';
import { EmployeesComponent } from './Files/components/employees/employees.component';
import { ClientsComponent } from './Files/components/clients/clients.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';




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



    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    MatIconModule,

    

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
