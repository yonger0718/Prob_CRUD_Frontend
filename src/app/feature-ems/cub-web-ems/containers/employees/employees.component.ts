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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  standalone: true,
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    RadioButtonModule,
    ConfirmDialogModule,
  ],
})
export class EmployeesComponent implements OnInit {
  private employeeServices = inject(EmployeeServices);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  employeeForm: FormGroup;

  selectedEmployees: Employee[] = []; // 提供一次性刪除用
  employees: Employee[] = []; // list
  employee: EmployeeDTO = {}; //建構新Employee用, create -> empty, edit -> employee injected
  gender = Gender; // Enum
  submitted: boolean = false;
  employeeDialog: boolean = false; // 跳出顯示輸入介面
  header: string = '';

  constructor(private formBuilder: FormBuilder) {
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
    this.header = '新增員工資訊';
    this.submitted = false;
    this.employeeDialog = true;
  }
  onSubmit() {
    if(this.employeeForm.invalid){
      return;
    }
    console.log(this.employee.employeeId === undefined); //用這個來判別是否為修改
    console.log(this.employeeForm.value);
  }
  deleteEmployee(employee: EmployeeDTO) {
  throw new Error('Method not implemented.');
  }
  editEmployee(employee: EmployeeDTO) {
    this.employee = employee;
    this.employeeForm.patchValue(employee);
    this.header = '編輯員工資訊';
    this.employeeDialog = true;
    console.log(employee);
   }
  deleteSelected() {
    throw new Error('Method not implemented.');
  }
}
