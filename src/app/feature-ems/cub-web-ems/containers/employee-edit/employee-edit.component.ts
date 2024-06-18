import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
  imports: [CommonModule],
})
export class EmployeeEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
