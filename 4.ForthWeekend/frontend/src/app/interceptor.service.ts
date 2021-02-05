import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {StudentService} from './student.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private data : StudentService) { }
  
  intercept (req,next){
    let tokenReq = req.clone({
      headers : req.headers.set('authorization' ,`Bearer ${this.data.getToken()}`)
      
    })
      return next.handle(tokenReq);
  }
}