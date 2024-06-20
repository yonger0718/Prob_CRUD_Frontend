import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './feature-ems/cub-web-ems/components/header/header.component';
import { EmployeesComponent } from './feature-ems/cub-web-ems/containers/employees/employees.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { EmployeeListPageComponent } from './feature-ems/cub-web-ems/pages/employee-list.page/employee-list.page.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeListPageComponent,
    HeaderComponent,
    EmployeesComponent,
    BrowserAnimationsModule,
    DialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
