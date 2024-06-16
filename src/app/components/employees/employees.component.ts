import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees?: Employee[];

  constructor() { }

  ngOnInit(): void {
  }

}
