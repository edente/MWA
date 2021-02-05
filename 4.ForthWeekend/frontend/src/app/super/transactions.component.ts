// import { Component, OnInit, OnDestroy } from '@angular/core';
// import {  SuperService  } from './super.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-tansactions',
//   template: `
//     <mat-toolbar color="success">
//       Lists of Transactions
//     </mat-toolbar>
//     <input
//       #box
//       (keyup)="onSearch(box.value)"
//       placeholder="Search by date yyyy-mm-dd"
//     />

//     <div *ngFor="let farmer of farmers">
//       <mat-expansion-panel  *ngFor="let order of farmer.orders">
//         <mat-expansion-panel-header>
//           <mat-panel-title>
//             <mat-icon>account_balance_wallet</mat-icon>
//             <h4 class="head">Transaction# - {{ order._id }}</h4></mat-panel-title
//           >
//           <mat-panel-description
//             ><h4 class="head">
//               {{ order.date |date: 'short'}}
//             </h4></mat-panel-description
//           >
//         </mat-expansion-panel-header>
//         <h4>Transactions Detail Informations</h4>
//         <mat-panel-description class="one"
//           >* Total transaction -{{
//             order.cart.totalPrice | currency
//           }}</mat-panel-description
//         >

//         <div *ngFor="let item of order.cart.items">
//           <mat-panel-description class="one"
//             >* Product name-{{ item.product.title }}</mat-panel-description
//           >
//           <mat-panel-description class="one"
//             >* Quantity - {{ item.quantity }}
//             {{ item.product.unit }}s</mat-panel-description
//           >
//           <mat-panel-description class="one"
//             >* Transaction between -
//             FarmerId - {{ farmer._id }} and CustomerId-{{order.customerId}} </mat-panel-description
//           >
//         </div>
//       </mat-expansion-panel>
//       </div>
//       <hr />
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
//         width: 250px;
//         border-color: gray;
//         border-radius: 7px;
//         height: 30px;
//         margin: 5px;
//         margin-left: 1150px;
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
// export class TransactionsComponent implements OnInit {
//   farmers;
//   subscription;
//   state;
//   alert = false;

//   constructor(private data:  SuperService , private route: Router) {}
//   ngOnInit(): void {
//         this.subscription = this.data
//       .farmers()
//       .subscribe((response) => {
//         console.log(response,"ddddd")
//         this.farmers = response;
//         this.state =[...this.farmers]
//          console.log(this.farmers);
//       });
//   }


//   onSearch(value) {
//     console.log(value)
//     if(value){
//       this.farmers =this.state.map((farmer)=>{
//        return farmer.orders.filter((order) => {
//           return order.date.slice(0,10) == value;
//         });
//       }) 
//   }else{
//     this.farmers = this.state;
//   }
//   }
//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
// }
