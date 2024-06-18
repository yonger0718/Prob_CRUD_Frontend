import { Component, OnInit } from '@angular/core';
import { EmployeeAddComponent } from '../../containers/employee-add/employee-add.component';

@Component({
  standalone: true,
  selector: 'app-employee-add.page',
  templateUrl: './employee-add.page.component.html',
  styleUrls: ['./employee-add.page.component.scss'],
  imports: [EmployeeAddComponent],
})
export class EmployeeAddPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  onFormSubmit($event: Event) {
    
  }
}
