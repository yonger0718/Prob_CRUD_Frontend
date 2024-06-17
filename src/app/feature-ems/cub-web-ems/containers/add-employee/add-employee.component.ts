import { Employee } from './../../interface/Employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeServices } from '../../services/EmployeeServices';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    private employeeServices: EmployeeServices,
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', [Validators.required]],
      employeePID: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]{1}[0-9]{9}$/)],
      ],
      employeePhoneNumber: ['', [Validators.required]],
      employeeEmail: ['', [Validators.required]],
      employeeGender: ['', [Validators.required]],
      employeeAddress: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }

    const employee: Employee = {
      employeeName: this.employeeForm.value['employeeName'],
      employeePID: this.employeeForm.value['employeePID'],
      employeeEmail: this.employeeForm.value['employeeEmail'],
      employeePhoneNumber: this.employeeForm.value['employeePhone'],
      employeeAddress: this.employeeForm.value['employeeAddress'],
      employeeGender: this.employeeForm.value['employeeGender'],
    };

    this.employeeServices.addEmployee(employee).subscribe({
      next: (resp) => {
        console.log('added successfully', resp);
        this.employeeForm.reset();
      },
      error: (err) => {
        console.log('發生錯誤', err);
      },
    });
  }
}
