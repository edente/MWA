import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Student } from './students-list/student.model';


@Injectable({
  providedIn: 'root'
})

export class StudentService {
  constructor(private http : HttpClient) { };

  getAll(){
    return this.http.get(`http://localhost:4000/api/students`);
    }

  deleteOne(studentId){
    console.log(">>>>>>>>>> about to delete one " +studentId);
    console.log(`http://localhost:4000/api/students/${studentId}`);
      return this.http.delete(`http://localhost:4000/api/students/${studentId}`);
    }

  signup(body){
    return this.http.post(`http://localhost:4000/api/students/signup`, body);
  }

  login(body){
    return this.http.post(`http://localhost:4000/api/students/login`, body);
  }


  getOne(studentId){
    return this.http.get<any>(`http://localhost:4000/api/students/${studentId}`);
  }

  updateOne(studentId){
     return this.http.put(`http://localhost:4000/api/students/studentId`,studentId);
    }
    
  isAuthenticated(){
    return !!localStorage.getItem('token')
  }

  isAuthorized(){
    let student = localStorage.getItem('data');
     student = JSON.parse(student);
    // return !!(student.role == 'student');
  }
  
  logout(){
     localStorage.removeItem('token');
     localStorage.removeItem('data');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  onUpload(file: any) {
    return this.http.post('http://localhost:4000/api/students/file-upload',file)
  }
}

