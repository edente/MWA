import { Component } from '@angular/core';
import {StudentService } from './student.service';

@Component({
  selector: 'app-root',
  template: `
  <html>
 <body>
 <div class="content">
   <div class="content-inside">
   <div class="toolbar">
  <span [routerLink] = "['']" id="title">Attendance</span> 
  <a [routerLink] = "['list']"> lists</a> 

   <div class="spacer"></div>
    <a [routerLink] = "['supers','students']" id="student" *ngIf="!!data.isAuthenticated() && !data.isAuthorized()">Student</a>
    <a [routerLink] = "['supers','customers']" id="list" *ngIf="!!data.isAuthenticated() && !data.isAuthorized()">Customers</a>
    <a [routerLink] = "['supers','transactions']" id="transaction" *ngIf="!!data.isAuthenticated() && !data.isAuthorized()">Transactions</a>
    <a [routerLink] = "['supers','files']" id="file" *ngIf="!!data.isAuthenticated() && !data.isAuthorized()">Log Files</a>
    <a [routerLink] = "['students','list']"  id="listproduct" *ngIf="!!data.isAuthenticated() && !!data.isAuthorized()"> Products</a>
    <a [routerLink] = "['students','add']" id="addproduct" *ngIf="!!data.isAuthenticated() && !!data.isAuthorized()"> Add Product</a>
     <a [routerLink] = "['login']"  id="login" *ngIf="!data.isAuthenticated()" >Log in</a> 
    <a [routerLink] = "['signup']" id="signup" *ngIf="!data.isAuthenticated()">Sign up</a>
    <a [routerLink] ="['']"  id="logout" *ngIf="!!data.isAuthenticated()" (click)="data.logout()">Logout</a>
  </div>
  <hr>
  
  <router-outlet></router-outlet>

   </div>
 </div>
 <footer class="footer"><a class="foot">HelpSend</a>  <a  class="foot">feedback</a>  <a class="foot">Privacy</a>  <a class="foot">Terms</a></footer>
</body>
</html>
 
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data;
  constructor(private student : StudentService){  this.data = this.student;}
}
