import { CommonModule } from '@angular/common';
import { EmployeeServices } from '../../services/EmployeeServices';
import { Component, OnInit, inject } from '@angular/core';
import {
  Employee,
  EmployeeDTO,
  Gender,
} from 'src/app/feature-ems/cub-web-ems/interface/Employee';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {  DropdownModule } from 'primeng/dropdown';

@Component({
  standalone: true,
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, DialogModule, FormsModule, InputTextModule, ReactiveFormsModule,DropdownModule],
})
export class EmployeesComponent implements OnInit {

  private employeeServices = inject(EmployeeServices);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  employeeForm: FormGroup;

  selectedEmployees: Employee[] = []; // 提供一次性刪除用
  employees: Employee[] = [];
  employee: EmployeeDTO = {}; //建構新Employee用
  gender = Gender; // Enum
  submitted: boolean = false;
  employeeDialog: boolean = false; // 跳出顯示輸入介面

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

  get f() {
    return this.employeeForm.controls;
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(): void {
    this.employeeServices.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  createNew() {
    this.employee = {};
    this.employeeForm.reset();
    this.submitted = false;
    this.employeeDialog = true;
  }
  deleteSelected() {
    throw new Error('Method not implemented.');
  }
}
