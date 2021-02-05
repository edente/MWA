import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students;
  subscription;
  constructor(private data: StudentService, private route: Router) {  }
  columns = ["studentId","First Name","Last Name", "Email", "phoneNumber", "Role"];
  index = ["studentId","firstName", "lastName", "email", "password", "phoneNumber","role"];
  ngOnInit(): void {
   this.subscription= this.data.getAll().subscribe((response) => {
      this.students = response;
      console.log(response)
    });
  
  
  }
  
  deleteStudent(studentID:String){
      this.data.deleteOne(studentID).subscribe((response)=>{
        console.log(response);
      });
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
