import { Component, OnInit } from '@angular/core';
import { SuperService } from './super.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: 'app-customers',
  template: `
  <mat-toolbar color="success">
  Lists of Customers
</mat-toolbar>
    <div class="alert alert-success" role="alert" *ngIf="alert">
      Succesfully changed!!!
    </div>

    <mat-expansion-panel *ngFor="let customer of customers">
      <mat-expansion-panel-header>
        <mat-panel-title>
          <mat-icon>account_box</mat-icon>
          <h4 class="head">
            {{ customer.firstName }} {{ customer.lastName }}
          </h4></mat-panel-title
        >
      </mat-expansion-panel-header>
      <h4>Customer Detail Informations</h4>
      <div class="one">
        <mat-panel-description 
        class="one"
          >
            * Phone number - {{ customer.phoneNumber }}
          </mat-panel-description
        >
        <mat-panel-description
        class="one"
          >* Email - {{ customer.email }}</mat-panel-description
        >
      </div>
      <mat-action-row>
        <div *ngIf="customer.active; else deactivate">
          <button
            class="btn btn-success"
            mat-raised-button
            (click)="onDeactivate(customer._id, customer.active)"
          >
            Activate
          </button>
        </div>
        <ng-template #deactivate>
          <button
            class="btn btn-danger"
            mat-raised-button
            (click)="onDeactivate(customer._id, customer.active)"
          >
            Deactivate
          </button>
        </ng-template>
        <button
          class="btn btn-info"
          mat-fab
          (click)="reset()"
        >
          Reset Password
        </button>
      </mat-action-row>
      <div *ngIf ="toggle">
      <h3>Reset Password Form</h3>
      <div class="alert alert-success" role="alert" *ngIf="alert1">Password is sucessfully changed!!!</div>
    
      <form [formGroup]="productsForm" (ngSubmit)="onSubmit(customer)">
      <div class="form-group">
        <label for="password">New password : </label>
        <input type="password" class="form-control" id="password" formControlName="password">
      </div>
    
      <button type="submit" class="btn btn-primary"  [disabled]="!productsForm.valid">Reset Password</button>
    </form>
      </div>
    </mat-expansion-panel>
    <hr />
  `,
  styles: [
    `
      #contact {
        font-size: 25px;
      }
      mat-icon {
        font-size: 40px;
        color: #48bbec;
      }
      .head {
        padding-left: 60px;
      }
      h1 {
        margin-top: 40px;
      }
      .one {
        background-color: rgb(234, 248, 242);
        font-size: 16px;
      }
      h4 {
        color: grey;
        font-size: 18px;
      }
      button {
        margin-right: 10px;
        width: 150px;
      }
    `,
  ],
})
export class CustomersComponent implements OnInit {
  productsForm :FormGroup;
  customers;
  subscription;
  status;
  alert = false;
  alert1 = false;
  toggle=false;

  constructor(private data: SuperService, private route: Router,private formBuilder: FormBuilder ) {
    this.productsForm = this.formBuilder.group({
      'password': ['', Validators.required]
    });
  }
  // [routerLink]="['update']" [state] ="{body:}"
  ngOnInit(): void {
    this.subscription = this.data.customers().subscribe((response) => {
      this.customers = response;
    });
  }

  onDeactivate(id, bool) {
    this.status = { active: !bool };
    this.data.customerDeactivation(id, this.status).subscribe((response) => {
      setTimeout(() => window.location.reload(), 2000);
      this.alert = true;
    });
  }
  reset(){
    this.toggle =true;
  }
  onSubmit(state){
    console.log(state.role);
    console.log(this.productsForm.value);
    this.subscription= this.data.farmerPassword(state._id,this.productsForm.value).subscribe(response=>{
        setTimeout(()=> {this.toggle= !this.toggle; window.location.reload()}
        ,2000);
        this.alert1= true;
      });
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
