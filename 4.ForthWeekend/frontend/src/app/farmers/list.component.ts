// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ProductService } from './product.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-list',
//   template: `
//   <h1></h1>
//     <h4>Welcome back {{ state.firstName }} {{ state.lastName }}.</h4>
//     <div class="alert alert-success" role="alert" *ngIf="alert">
//       Product is sucessfully deleted!!!
//     </div>
//     <mat-toolbar color="success">
//       List of Products
//     </mat-toolbar>
//     <div class="content" fxLayout="row wrap" fxLayoutGap="16px grid">
//       <div fxFlex="25%" *ngFor="let product of state.products">
//         <mat-card class="mat-elevation-z4">
//           <mat-card-header>
//             <div mat-card-avatar class="example-header-image"></div>
//             <mat-card-title>{{ product.title | uppercase }}</mat-card-title>
//             <mat-card-subtitle
//               >product of {{ state.company }} farm</mat-card-subtitle
//             >
//           </mat-card-header>
//           <img
//             mat-card-image
//             src="{{ product.image }}"
//             alt="Photo of a Shiba Inu"
//           />
//           <mat-card-content>
//             <p>{{ product.price }}/{{ product.unit }}</p>
//             <p>{{ product.quantity }} {{ product.unit }}s left at store</p>
//           </mat-card-content>
//           <mat-card-actions>
//             <button
//               type="button"
//               class="btn btn-success"
//               [routerLink]="['update']"
//               [state]="{ body: product }"
//             >
//               Edit
//             </button>
//             <button
//               type="button"
//               class="btn btn-danger"
//               (click)="onDelete(product._id)"
//             >
//               Delete
//             </button>
//           </mat-card-actions>
//         </mat-card>
//       </div>
//     </div>
//   `,
//   styles: [
//     `
//       .content {
//         padding: 16px;
//       }
//       mat-card-content{
//         color: gray
//       }
//       img{
//       height: 200px
//       }
//       h1{
//         margin-top: 40px;
//       }
//       .content > mat-card {
//         width: 200px;
//       }
//       button {
//         width: 150px;
//         margin-right: 5px;
//       }
//       mat-card-subtitle {
//         color: gray;
//         font-style: italic;
//       }
      
//       h4 {
//         margin-top: 40px;
//         color: grey;
//         font-size: 18px;
//       }
//     `,
//   ],
// })
// export class ListComponent implements OnInit {
//   state;
//   farmer;
//   subscription;
//   alert = false;
//   constructor(private data: ProductService, private route: Router) {  }
//   ngOnInit(): void {
//     this.data.getData().subscribe((response) => {
//       this.farmer = JSON.parse(response);
//       console.log(this.farmer.role);
//     });
//     console.log(this.farmer._id);
//     this.subscription = this.data
//       .listProducts(this.farmer._id)
//       .subscribe((response) => {
//         this.state = response[0];
//         this.state.products.map(product=>console.log(product.image))
//       });
//   }

//   onDelete(productId) {
//     return this.data
//       .deleteProducts(this.farmer._id, productId)
//       .subscribe((response) => {
//         setTimeout(() => window.location.reload(), 2000);
//         this.alert = true;
//       });
//   }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
// }


