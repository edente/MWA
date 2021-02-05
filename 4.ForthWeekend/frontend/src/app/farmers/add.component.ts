// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ProductService } from './product.service';
// import { Router } from '@angular/router';
// import {
//   FormGroup,
//   FormControl,
//   Validators,
//   FormBuilder,
//   FormArray,
// } from '@angular/forms';

// @Component({
//   selector: 'app-add',
//   template: `
//     <h1></h1>
    
//     <mat-card class="example-card">
//       <mat-card-header>
//         <mat-card-title>Add Product Form</mat-card-title>
//       </mat-card-header>
//       <mat-card-content>
//       <div class="alert alert-success" role="alert" *ngIf="alert">
//       Product is sucessfully Added!!!
//     </div>

//     <form [formGroup]="productsForm" (ngSubmit)="onSubmit()">
//       <div class="form-group">
//         <label for="title">Title : </label>
//         <input
//           type="text"
//           class="form-control"
//           id="title"
//           formControlName="title"
//         />
//       </div>
//       <div class="form-group">
//         <label for="file">File</label>
//         <input
//           type="file"
//           class="form-control"
//           name="file"
//           id="file"
//           (change)="onFileChange($event)"
//         />
//       </div>

//       <div class="form-group">
//         <label for="quantity"> Quantity: </label>
//         <input
//           type="text"
//           class="form-control"
//           id="quantity"
//           formControlName="quantity"
//         />
//       </div>
//       <div class="form-group">
//         <label for="price">Price: </label>
//         <input
//           type="text"
//           class="form-control"
//           id="price"
//           formControlName="price"
//         />
//       </div>

//       <div class="form-group">
//         <label for="unit"> Unit : </label>
//         <select class="form-control" id="unit" formControlName="unit">
//           <option>lb</option>
//           <option>lt</option>
//           <option>pkg</option>
//         </select>
//       </div>

//       <button
//         type="submit"
//         class="btn btn-primary"
//         [disabled]="!productsForm.valid"
//       >
//         Add Product
//       </button>
//     </form>
//       </mat-card-content>
//     </mat-card>
//   `,
//   styles: [
//     `
//     mat-card{
//       width :550px;
//       background-color:honeydew;
//       margin-left:420px;
//       height: 500px
//     }
//       input,
//       select {
//         width: 450px;
//       }
//       div {
//         margin: 1em;
//       }
//       p {
//         color: green;
//         margin-top: 10px;
//         margin-left:120px;

//       }
//       h1 {
//         margin-top: 40px;
//         font-weight: bold;
//       }
//       button{
//         width: 200px;
//         margin-left:120px;
//         background-color:#48BBEC;

//       }
//     `,
//   ],
  
// })
// export class AddComponent {
//   productsForm: FormGroup;
//   subscription;
//   file;
//   state;
//   alert = false;
//   // <div *ngIf="{{file}}.touched && {{file}}.invalid" class="alert alert-danger">
//   //     <div *ngIf="{{file}}.errors.required">File is required.</div></div>
//   constructor(
//     private formBuilder: FormBuilder,
//     private data: ProductService,
//     private route: Router
//   ) {
//     this.productsForm = this.formBuilder.group({
//       title: ['', Validators.required],
//       quantity: ['', Validators.required],
//       price: ['', Validators.required],
//       unit: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     this.subscription = this.data.getData().subscribe((response) => {
//       this.state = JSON.parse(response);
//     });
//   }

//   get f() {
//     return this.productsForm.controls;
//   }

//   onFileChange(event) {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//       // this.productsForm.patchValue({
//       //   file : file
//       // });
//       this.file = file;
//     }
//   }

//   onSubmit() {
//     const formData = new FormData();
//     formData.append('price', this.productsForm.get('price').value);
//     formData.append('title', this.productsForm.get('title').value);
//     formData.append('quantity', this.productsForm.get('quantity').value);
//     formData.append('unit', this.productsForm.get('unit').value);
//     formData.append('file', this.file);
//     //  console.log(this.productsForm.get('price').value);
//     //  console.log(formData.values);
//     console.log(formData.get('file'));
//     console.log(formData.get('price'));

//     this.subscription = this.data
//       .addProducts(this.state._id, formData)
//       .subscribe((response) => {
//         console.log(response);
//         setTimeout(() => this.route.navigate(['/farmers/list']), 2000);
//         this.alert = true;
//       });
//   }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
// }
