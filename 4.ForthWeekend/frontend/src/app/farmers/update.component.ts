// import { Component, OnInit,OnDestroy } from '@angular/core';
// import { ProductService } from './product.service';
// import { Router } from '@angular/router';
// import {
//   FormGroup,
//   FormControl,
//   Validators,
//   FormBuilder,
//   FormArray
// } from "@angular/forms";


// @Component({
//   selector: 'app-add',
//   template: `
//   <h3>Update Product Form</h3>
//   <div class="alert alert-success" role="alert" *ngIf="alert">Product is sucessfully updated!!!</div>

//   <form [formGroup]="productsForm" (ngSubmit)="onSubmit()">
//   <div class="form-group">
//     <label for="title">Title : </label>
//     <input type="text" class="form-control" id="title" formControlName="title">
//   </div>
//   <div class="form-group">
//     <label for="quantity"> Quantity: </label>
//     <input type="text" class="form-control" id="quantity" formControlName="quantity">
//   </div>
//   <div class="form-group">
//     <label for="price">Price: </label>
//     <input type="text" class="form-control" id="price" formControlName="price">
//   </div>
 
//   <div class="form-group">
//   <label for="unit"> Unit : </label>
//   <select class="form-control" id="unit" formControlName="unit">
//     <option>lb</option>
//     <option>lt</option>
//     <option>pkg</option>
//   </select>
//   </div>
  
//   <button type="submit" class="btn btn-primary"  [disabled]="!productsForm.valid">Update Product</button>
// </form>
//   `,
//   styles: ['input,select {width :700px} div{margin: 1em} h3{margin-top:40px}']
  
// })
// export class UpdateComponent {
//   productsForm :FormGroup;
//   subscription;
//   state;
//   farmer;
//   alert =false;
//   constructor(private formBuilder: FormBuilder ,private data : ProductService ,private route : Router) {
//     this.state = this.route.getCurrentNavigation().extras.state.body;

//     this.productsForm = this.formBuilder.group({
//       'title': [this.state.title, Validators.required],
//       'quantity': [this.state.quantity, Validators.required],
//       'price': [this.state.price, Validators.required],
//       'unit': [this.state.unit, Validators.required]
//     });
//   };

//   ngOnInit(): void {
//     this.subscription = this.data.getData().subscribe(response=>{
//       this.farmer =JSON.parse(response);
//     })
    
//    };


//   onSubmit(){
//     console.log(this.farmer._id)
//     console.log(this.state._id)

//     console.log(this.productsForm.value)

//     this.subscription = this.data.updateProducts(this.farmer._id,this.state._id,this.productsForm.value).subscribe(response=>{
//       setTimeout(()=>this.route.navigate(['/farmers/list']),2000);
//       this.alert= true;
//     });
//   } 

//   ngOnDestroy(){
//     this.subscription.unsubscribe();
//   }


// }


