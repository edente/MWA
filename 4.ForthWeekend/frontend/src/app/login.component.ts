import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from './student.service';

@Component({
  selector: 'app-login',
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

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email : </label>
            <input
              type="text"
              class="form-control"
              id="email"
              formControlName="email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password : </label>
            <input
              type="password"
              class="form-control"
              id="password"
              formControlName="password"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="!loginForm.valid"
          >
            Sign In
          </button>
          <p>Don't have account? Please sign up !!</p>
          <button
            type="submit"
            class="btn btn-primary"
            (click)="goto()"
          >
            Sign Up
          </button>
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
      height: 350px
    }
      input,
      select {
        width: 450px;
      }
      div {
        margin: 1em;
      }
      p {
        color: green;
        margin-top: 10px;
        margin-left:120px;

      }
      h1 {
        margin-top: 40px;
        font-weight: bold;
      }
      button{
        width: 200px;
        margin-left:120px;
        background-color:#48BBEC;

      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  subscription;
  message;
  alert = false;
  constructor(
    private formBuilder: FormBuilder,
    private data: StudentService,
    private route: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.subscription = this.data.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response['student']);
        localStorage.setItem('token', response['token']);
        localStorage.setItem('data', JSON.stringify(response['student']));
        this.route.navigate(['/students']);
      },
      (err) => {
        this.message = err.error;
        console.log(err)
      }
    );
    this.alert = true;
  }

  goto(){
    this.route.navigate(['/signup']);

  }
}
