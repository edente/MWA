 
export class Student {
  // studentId:number
    firstName:string;
    lastName:string;
    email:  string;
    password:  string;
    phoneNumber: Number;
    role: string;
 
  constructor(firstname, lastname,email, password, phoneNumber,role)
  {   // this.studentId=studentId;
       this.firstName=firstname;
      this.lastName=lastname;
      this.email=email;
      this.password=password;
      this.phoneNumber=phoneNumber;
      this.role=role;
  }
}