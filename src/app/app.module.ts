import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './feature-ems/cub-web-ems/components/header/header.component';
import { EmployeesComponent } from './feature-ems/cub-web-ems/containers/employees/employees.component';
import { AddEmployeeComponent } from './feature-ems/cub-web-ems/containers/add-employee/add-employee.component';
import { EditEmployeeComponent } from './feature-ems/cub-web-ems/containers/edit-employee/edit-employee.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
