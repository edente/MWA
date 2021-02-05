// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ProductService } from './product.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-orders',
//   template: `
//   <h1></h1>
//     <mat-toolbar color="success">
//       Lists of Orders
//     </mat-toolbar>
   
//     <input #box (keyup)="onSearch(box.value)" placeholder="Search by status" />

//     <mat-expansion-panel *ngFor="let order of orders">
//       <mat-expansion-panel-header>
//         <mat-panel-title>
//           <mat-icon>account_balance_wallet</mat-icon>
//           <h4 class="head">order# - {{ order._id }}</h4></mat-panel-title
//         >
//         <mat-panel-description
//           ><h4 class="head">
//             {{ order.status | uppercase }}
//           </h4></mat-panel-description
//         >
//       </mat-expansion-panel-header>
//       <h4>Order Detail Informations</h4>
//       <mat-panel-description class="one"
//         >* Total price -{{
//           order.cart.totalPrice | currency
//         }}</mat-panel-description
//       >

//       <div *ngFor="let item of order.cart.items">
//         <mat-panel-description class="one"
//           >* Product name-{{ item.product.title }}</mat-panel-description
//         >
//         <mat-panel-description class="one"
//           >* Quantity - {{ item.quantity }}
//           {{ item.product.unit }}s</mat-panel-description
//         >
//         <mat-panel-description class="one"
//           >* Ordered at -
//           {{ order.date | date: 'medium' }}</mat-panel-description
//         >
//         <mat-action-row>
//         <div class="alert alert-success" role="alert" *ngIf="alert">
//         Sucessfully changed!!!
//         </div>
//           <button
//             class="btn btn-info"
//             id="btn1"
//             mat-raised-button
//             value="ready"
//             #status1
//             (click)="onChange(order.customerId, order._id, status1)"
//           >
//             Ready
//           </button>
//           <button
//             class="btn btn-success"
//             id="btn2"
//             mat-raised-button
//             value="complete"
//             #status2
//             (click)="onChange(order.customerId, order._id, status2)"
//           >
//             Complete
//           </button>
//         </mat-action-row>
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
//         color: grey;
//         font-size: 18px;
//       }
//       input {
//         width: 200px;
//         border-color: gray;
//         border-radius: 7px;
//         height: 30px;
//         margin: 5px;
//         margin-left: 1200px;
//         font-size: 16px;
//       }
//       h1 {
//         margin-top: 40px;
//       }
//       h4 {
//         color: grey;
//         font-size: 18px;
//       }
//       button {
//         margin-right: 10px;
//         width: 150px;
//       }
//       .one {
//         background-color: rgb(234, 248, 242);
//         font-size: 16px;
//       }
//     `,
//   ],
// })
// export class OrdersComponent implements OnInit {
//   orders;
//   state;
//   farmer;
//   body;
//   immutable;
//   subscription;
//   alert = false;

//   constructor(private data: ProductService, private route: Router) {}
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
//         this.orders = this.state.orders;
//         this.immutable = [...this.orders];
//         console.log(response);
//       });
//   }

//   onChange(id, orderId, status) {
//     console.log(status.value, 'status bvleu');
//     if (status.value == 'ready') {
//       this.body = {
//         status: 'ready',
//         id,
//         address: this.state.address,
//         phoneNumber: this.state.phoneNumber,
//       };
//     } else {
//       this.body = {
//         status: 'complete',
//         id,
//         address: this.state.address,
//         phoneNumber: this.state.phoneNumber,
//       };
//     }
//     this.data
//       .order(this.farmer._id, orderId, this.body)
//       .subscribe((response) => {
//         console.log(response);
//         setTimeout(() => window.location.reload(), 2000);
//         this.alert = true;
//       });
//   }

//   onSearch(value) {
//     console.log(value);
//     if (value) {
//       this.orders = this.immutable.filter((order) => {
//         return order.status.toLowerCase().startsWith(value.toLowerCase());
//       });
//     } else {
//       this.orders = this.immutable;
//     }
//   }
//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
// }
