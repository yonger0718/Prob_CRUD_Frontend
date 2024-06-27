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
import { FileUploadModule } from 'primeng/fileupload';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { ActivatedRoute, Router } from '@angular/router';
import { validatePID } from '../../utils/validator';
import { environment } from 'src/environments/environment';

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
    ToastModule,
    AvatarModule,
    FileUploadModule,
  ],
})
export class EmployeesComponent implements OnInit {
onProgress($event: any) {
throw new Error('Method not implemented.');
}
  private employeeServices = inject(EmployeeServices);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  employeeForm: FormGroup;

  selectedEmployees: Employee[] = []; // 提供一次性刪除用
  employees: Employee[] = []; // list
  employee: EmployeeDTO = {}; //建構新Employee用, create -> empty, edit -> employee injected
  gender = Gender; // Enum
  employeeDialog: boolean = false; // 跳出顯示輸入介面
  header: string = '';
  selectedFile: File | null = null;
  storageApi = environment.storageUrl;

  /**
   * 構建表單和他的驗證方法
   * @param formBuilder
   */
  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', [Validators.required]],
      employeePID: ['', [Validators.required, validatePID()]],
      employeePhoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^09\d{8}$/)],
      ],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeeGender: ['', [Validators.required]],
      employeeAddress: ['', [Validators.required]],
    });
  }

  /**
   *
   * 讀取表單的控制項用 -> 取得formGroup的control -> 用來作validate
   * @readonly
   * @memberof EmployeesComponent
   */
  get f() {
    return this.employeeForm.controls;
  }

  ngOnInit(): void {
    console.log(Date.now().toString());
    this.getEmployees(); // 先載入所有資料
    this.route.queryParams.subscribe((params) => {
      if (params['add'] === 'true') {
        this.createNew();
        this.router.navigate(['employee'], {
          queryParams: { add: null },
          queryParamsHandling: 'merge',
        });
      }
    });
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
    this.employeeDialog = true;
  }

  onUpload($event: any) {
    this.selectedFile = $event.files[0];
  }
  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }
    this.confirmationService.confirm({
      message: '確定要送出嗎?',
      accept: () => {
        if (this.employee.employeeId === undefined) {
          // 非修改則不會有employee傳入 -> no default value = undefined
          const formData: FormData = new FormData();
          formData.append('employee', JSON.stringify(this.employeeForm.value));
          if (this.selectedFile) {
            formData.append(
              'image',
              this.selectedFile,
              Date.now().toString() + this.selectedFile.name.split('.').pop() //確保不會有奇怪的檔案名稱
            );
          }
          this.employeeServices.addEmployee(this.employeeForm.value).subscribe({
            next: (emp) => {
              this.getEmployees();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: '新增員工成功: id為{ ' + emp.employeeId + ' }',
                life: 3000,
              });
              this.employeeDialog = false;
              this.employeeForm.reset();
            },
            error: (msg) => {
              console.log(msg);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: '新增員工失敗: ' + msg.error,
                life: 3000,
              });
            },
          });
        } else {
          this.employeeServices
            .updateEmployee(this.employee.employeeId, this.employeeForm.value)
            .subscribe({
              next: () => {
                this.getEmployees();
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: '編輯員工成功',
                  life: 3000,
                });
                this.employeeDialog = false;
                this.employeeForm.reset();
              },
              error: (msg) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: '編輯員工失敗: ' + msg.error,
                  life: 3000,
                });
              },
            });
        }
      },
    });
  }

  deleteEmployee(employee: EmployeeDTO) {
    if (employee.employeeId === undefined) {
      return;
    } else {
      this.confirmationService.confirm({
        message: '確定要刪除嗎?',
        header: '確認',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.employeeServices
            .deleteEmployee(employee.employeeId!) //assert non-null to bypass the undefined check
            .subscribe(() => {
              this.getEmployees();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: '刪除員工成功',
                life: 3000,
              });
            });
        },
      });
    }
  }
  editEmployee(employee: EmployeeDTO) {
    this.employee = employee;
    this.employeeForm.patchValue(employee);
    this.header = '編輯員工資訊';
    this.employeeDialog = true;
  }
  deleteSelected() {
    this.confirmationService.confirm({
      message: '確定要刪除嗎?',
      header: '確認',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedEmployees.forEach((element) => {
          this.employeeServices
            .deleteEmployee(element.employeeId!) //assert non-null to bypass the undefined check
            .subscribe(() => {
              this.selectedEmployees = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: '刪除員工成功',
                life: 3000,
              });
              this.getEmployees();
            });
        });
      },
    });
  }
}
