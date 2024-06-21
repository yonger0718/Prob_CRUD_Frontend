import { Component } from '@angular/core';
import { EmployeesComponent } from '../../containers/employees/employees.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-employee-list.page',
  templateUrl: './employee-list.page.component.html',
  styleUrls: ['./employee-list.page.component.scss'],
  imports: [EmployeesComponent, HeaderComponent],
})
export class EmployeeListPageComponent {
  constructor() {}
}
