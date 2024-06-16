export interface Employee {
  id?: number;
  name: string;
  PID: string;
  email: string;
  phoneNumber: string;
  Address: string;
  gender: gender;
  createTime?: Date;
  updateTime?: Date;
}

enum gender {
  male = 'm',
  female = 'f',
}
