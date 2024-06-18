import { CommonModule } from '@angular/common';
import { EmployeeServices } from '../../services/EmployeeServices';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/feature-ems/cub-web-ems/interface/Employee';

@Component({
  standalone: true,
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  imports: [CommonModule],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private EmployeeServices: EmployeeServices) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(): void {
    this.EmployeeServices.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }
}
