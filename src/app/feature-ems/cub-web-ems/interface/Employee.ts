export interface Employee {
  employeeId?: number;
  employeeName: string;
  employeePID: string;
  employeeEmail: string;
  employeePhoneNumber: string;
  employeeAddress: string;
  employeeGender: gender;
  employeeCreateTime?: Date;
  employeeUpdateTime?: Date;
}

enum gender {
  male = 'm',
  female = 'f',
}
