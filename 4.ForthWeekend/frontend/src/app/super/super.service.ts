import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuperService {

  constructor(private http : HttpClient) { };

  // farmers(){
  //   return this.http.get(`http://localhost:4000/api/supers`)
  // }

  customers(){
    return this.http.get(`http://localhost:4000/api/customers`)
  }

  customerPassword(id,body){
    return this.http.patch(`http://localhost:4000/api/customers/${id}`,body)
  }

  customerDeactivation(id,body){
    return this.http.patch(`http://localhost:4000/api/customers/${id}/accounts`,body)
  }

  farmerPassword(id,body){
    return this.http.patch(`http://localhost:4000/api/farmers/${id}`,body)
  }

  farmerDeactivation(id,body){
    return this.http.patch(`http://localhost:4000/api/farmers/${id}/accounts`,body)
  }
  logfiles(){
    return this.http.get(`http://localhost:4000/api/farmers/logs/files`)
  }
}
