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
  template: `
 <h1></h1>
  <mat-card class="example-card">
    <mat-card-header>
      <mat-card-title>Log In Form</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <div class="alert alert-danger" role="alert" *ngIf="alert">
        {{ message }}
      </div>

      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="firstName">First name : </label>
        <input type="text" class="form-control" id="firstName" name="firstName" formControlName="firstName">
      </div>
      <div class="form-group">
        <label for="lastName">Last name : </label>
        <input type="text" class="form-control" id="lastName" formControlName="lastName">
      </div>
      <div class="form-group">
        <label for="email">Email : </label>
        <input type="text" class="form-control" id="email" formControlName="email">
      </div>
      <div class="form-group">
        <label for="password">Password : </label>
        <input type="password" class="form-control" id="password" formControlName="password">
      </div>
       
       
      <div class="form-group">
        <label for="phoneNumber">PhoneNumber : </label>
        <input type="phoneNumber" class="form-control" id="phoneNumber" formControlName="phoneNumber">
      </div>
      
      <button type="submit" class="btn btn-primary"  [disabled]="!signupForm.valid">Sign Up</button>
    </form>
    </mat-card-content>
  </mat-card>
`,
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
      'firstName': [this.student.firstName, Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
       'phoneNumber': ['', Validators.required],
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
