import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { EmployeeServices } from '../../services/EmployeeServices';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EmployeeAddComponent implements OnInit {
  employeeForm: FormGroup;

  private employeeServices: EmployeeServices = inject(EmployeeServices);

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', [Validators.required]],
      employeePID: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]\d{9}$/)],
      ],
      employeePhoneNumber: ['', [Validators.required]],
      employeeEmail: ['', [Validators.required, Validators.email]],
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

    this.employeeServices.addEmployee(this.employeeForm.value).subscribe({
      next: (resp) => {
        console.log('added successfully', resp);
        this.employeeForm.reset();
        alert('新增成功');
      },
      error: (err) => {
        console.log('發生錯誤', err);
      },
    });
  }
}
