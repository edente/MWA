import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { StudentService} from './student.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router : Router , private data :StudentService){}
  canActivate() :boolean {
  if(this.data.isAuthenticated()){
    return true;
  }else{
    this.router.navigate(['login'])
    return false
  }
  }
  
}