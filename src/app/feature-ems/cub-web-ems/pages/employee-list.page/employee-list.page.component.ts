import { Component, OnInit } from '@angular/core';
import { EmployeesComponent } from "../../containers/employees/employees.component";

@Component({
    standalone: true,
    selector: 'app-employee-list.page',
    templateUrl: './employee-list.page.component.html',
    styleUrls: ['./employee-list.page.component.scss'],
    imports: [EmployeesComponent]
})
export class EmployeeListPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
