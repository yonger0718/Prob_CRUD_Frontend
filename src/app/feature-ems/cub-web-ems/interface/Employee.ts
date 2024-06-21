export interface Employee {
  employeeId?: number;
  employeeName: string;
  employeePID: string;
  employeeEmail: string;
  employeePhoneNumber: string;
  employeeAddress: string;
  employeeGender: Gender;
  employeeCreateTime?: Date;
  employeeUpdateTime?: Date;
}

export enum Gender {
  male = 'm',
  female = 'f',
}

export interface EmployeeDTO{
  employeeId?: number;
  employeeName?: string;
  employeePID?: string;
  employeeEmail?: string;
  employeePhoneNumber?: string;
  employeeAddress?: string;
  employeeGender?: Gender;
}
