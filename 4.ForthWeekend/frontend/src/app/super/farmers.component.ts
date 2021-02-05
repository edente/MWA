// import { Component, OnInit, ViewChild } from '@angular/core';
// import { SuperService } from './super.service';
// import { Router } from '@angular/router';
// import {
//   FormGroup,
//   FormControl,
//   Validators,
//   FormBuilder,
// } from "@angular/forms";


// @Component({
//   selector: 'app-farmers',
//   template: `
//   <mat-toolbar color="success">
//   Lists of Farmers
// </mat-toolbar>
//     <div class="alert alert-success" role="alert" *ngIf="alert">
//       Succesfully changed!!!
//     </div>

//     <mat-expansion-panel *ngFor="let farmer of farmers">
//       <mat-expansion-panel-header>
//         <mat-panel-title>
//           <mat-icon>account_circle</mat-icon>
//           <h4 class="head">
//             {{ farmer.firstName }} {{ farmer.lastName }}
//           </h4></mat-panel-title
//         >
//         <mat-panel-description
//           ><h4 class="head">
//             {{ farmer.company | uppercase }}
//           </h4></mat-panel-description
//         >
//       </mat-expansion-panel-header>
//       <h4>Farmer Detail Informations</h4>
//       <div class="one">
//         <mat-panel-description class="one"
//           >* Address - {{ farmer.address }}</mat-panel-description
//         >
//         <mat-panel-description class="one"
//           >* Phone number - {{ farmer.phoneNumber }}</mat-panel-description
//         >
//         <mat-panel-description class="one"
//           >* Email - {{ farmer.email }}</mat-panel-description
//         >
//       </div>
//       <mat-action-row>
//         <div *ngIf="farmer.active; else deactivate">
//           <button
//             class="btn btn-success"
//             mat-raised-button
//             (click)="onDeactivate(farmer._id, farmer.active)"
//           >
//             Activate
//           </button>
//         </div>
//         <ng-template #deactivate>
//           <button
//             class="btn btn-danger"
//             mat-raised-button
//             (click)="onDeactivate(farmer._id, farmer.active)"
//           >
//             Deactivate
//           </button>
//         </ng-template>
//         <button
//           class="btn btn-info"
//           mat-fab
//           (click)="reset()"
//         >
//           Reset Password
//         </button>
//       </mat-action-row>
//       <div *ngIf ="toggle">
//       <h3>Reset Password Form</h3>
//       <div class="alert alert-success" role="alert" *ngIf="alert1">Password is sucessfully changed!!!</div>
    
//       <form [formGroup]="productsForm" (ngSubmit)="onSubmit(farmer)">
//       <div class="form-group">
//         <label for="password">New password : </label>
//         <input type="password" class="form-control" id="password" formControlName="password">
//       </div>
    
//       <button type="submit" class="btn btn-primary"  [disabled]="!productsForm.valid">Reset Password</button>
//     </form>
//       </div>
//     </mat-expansion-panel>
//     <hr />
//   `,
//   styles: [
//     `
//       #contact {
//         font-size: 25px;
//       }
//       mat-icon {
//         font-size: 40px;
//         color: #48bbec;
//       }
//       .head {
//         padding-left: 60px;
//       }
//       h1 {
//         margin-top: 40px;
//       }
//       .one {
//         background-color: rgb(234, 248, 242);
//         font-size: 16px;
//       }
//       h4 {
//         color: grey;
//         font-size: 18px;
//       }
//       button {
//         margin-right: 10px;
//         width: 150px;
//       }
//     `,
//   ],
// })
// export class FarmersComponent implements OnInit {
//   productsForm :FormGroup;
//   farmers;
//   subscription;
//   status;
//   alert = false;
//   alert1 = false;
//   toggle=false;

//   constructor(private data: SuperService, private route: Router,private formBuilder: FormBuilder) {
//     this.productsForm = this.formBuilder.group({
//       'password': ['', Validators.required]
//     });
//   }
//   ngOnInit(): void {
//     this.subscription = this.data.farmers().subscribe((response) => {
//       this.farmers = response;
//     });
//   }

//   onDeactivate(id, bool) {
//     this.status = { active: !bool };
//     this.data.farmerDeactivation(id, this.status).subscribe((response) => {
//       setTimeout(() => window.location.reload(), 2000);
//       this.alert = true;
//     });
//   }
//   reset(){
//     this.toggle =true;
//   }
//   onSubmit(state){
//     console.log(state.role);
//     console.log(this.productsForm.value);
//     this.subscription= this.data.customerPassword(state._id,this.productsForm.value).subscribe(response=>{
//         setTimeout(()=> {this.toggle= !this.toggle; window.location.reload()}
//         ,2000);
//         this.alert1= true;
//       });
    
//   }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
// }
