import { Component, OnInit,OnDestroy } from '@angular/core';
import { SuperService} from './super.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";


@Component({
  selector: 'app-reset',
  template: `
  <h3>Reset Password Form</h3>
  <div class="alert alert-success" role="alert" *ngIf="alert">Password is sucessfully changed!!!</div>

  <form [formGroup]="productsForm" (ngSubmit)="onSubmit()">
  <div class="form-group">
    <label for="password">New password : </label>
    <input type="password" class="form-control" id="password" formControlName="password">
  </div>

  <button type="submit" class="btn btn-primary"  [disabled]="!productsForm.valid">Reset Password</button>
</form>
  `,
  styles: ['input,select {width :700px} div{margin: 1em} h3{margin-top:40px}']
  
})
export class ResetComponent {
  productsForm :FormGroup;
  subscription;
  state;
  alert =false;
  constructor(private formBuilder: FormBuilder ,private data : SuperService ,private route : Router) {
    this.state = this.route.getCurrentNavigation().extras.state.body;

    this.productsForm = this.formBuilder.group({
      'password': ['', Validators.required]
    });
  };

  
  onSubmit(){
    console.log(this.state.role);
    console.log(this.productsForm.value);
    if(this.state.role == 'farmer'){
    this.subscription = this.data.farmerPassword(this.state._id,this.productsForm.value).subscribe(response=>{
      setTimeout(()=>this.route.navigate(['/supers/farmers']),2000);
      this.alert= true;
    });
    }else{
       this.data.customerPassword(this.state._id,this.productsForm.value).subscribe(response=>{
        setTimeout(()=>this.route.navigate(['/supers/customers']),2000);
        this.alert= true;
      });
    }
  } 

  


}


