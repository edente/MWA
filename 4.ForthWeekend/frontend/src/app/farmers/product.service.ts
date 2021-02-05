// import { Injectable } from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import { of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {

//   constructor(private http : HttpClient) { };

//   listProducts(id){
//     return this.http.get(`http://localhost:4000/api/farmers/${id}`);
//   }

//   addProducts(id,body){
//     return this.http.post(`http://localhost:4000/api/farmers/${id}`,body);
//   }

//   updateProducts(id,productId,body){
//     return this.http.patch(`http://localhost:4000/api/farmers/${id}/products/${productId}`,body);
//   }

//   deleteProducts(id,productId){
//     return this.http.delete(`http://localhost:4000/api/farmers/${id}/products/${productId}`);
//   }

//   // status change
//   order(id,orderId,body){
//     return this.http.patch(`http://localhost:4000/api/farmers/${id}/orders/${orderId}`,body);
//   }
//   getData(){
//     let data = localStorage.getItem('data');
//     return of(data);
//   }
// }
