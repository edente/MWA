import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import {ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {StudentService} from './student.service';
import { Student } from './students-list/student.model';

@Component({
  selector: 'app-signup',
  templateUrl:'./signup.component.html',
styles: [
  `
  mat-card{
    width :550px;
    background-color:honeydew;
    margin-left:420px;
    height: 650px
  }
    input,
    select {
      width: 450px;
    }
    div {
      margin: 1em;
    }
    
    h1 {
      margin-top: 40px;
    }
    button{
      width: 200px;
      margin-left:120px;
      background-color:#48BBEC;

    }
  `,
],
})
export class SignupComponent implements OnInit{
  signupForm :FormGroup;
  student:Student;
  subscription;
  message;
  sub:Subscription;
  alert = false;
  constructor(private r:ActivatedRoute, private formBuilder: FormBuilder ,private data : StudentService ,private route : Router) {

    this.signupForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
       'phoneNumber': ['', Validators.required],
       'photo': ['']
    });
  }

  ngOnInit(){
    this.sub=this.r.params.subscribe(params => {
      
      const id=params['id'];
      
      if(id){
        this.data.getOne(id).subscribe((student)=>{
          console.log(student.firstName);
          this.student=student;
        })
      }

    })
  }


  onFileChanged(event){
    const file = event.target.files[0];
    console.log("file: "+file);
    // this.signupForm.value['photo']=file;
    // this.data.onUpload(file).subscribe((data)=>{
    //   console.log("saved pic: "+data);
      
    // })
  }

  onSubmit(){
    console.log(this.signupForm.value);
    this.subscription = this.data.signup(this.signupForm.value).subscribe(response=>{
      this.route.navigate(['/login']);
    }, (err) => {
      this.message = err.error;
    }
  );
  this.alert = true;
  }
}
