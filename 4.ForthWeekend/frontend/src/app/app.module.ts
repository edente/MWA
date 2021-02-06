import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,PreloadAllModules } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {InterceptorService} from './interceptor.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { StudentsListComponent } from './students-list/students-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
     StudentsListComponent,
      
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    RouterModule.forRoot([
      { path :'', component : HomeComponent,  pathMatch: 'full'},
      { path :'login', component : LoginComponent},
      { path :'signup', component : SignupComponent},
      { path :'signup/edit/:id', component : SignupComponent},
      { path :'list', component : StudentsListComponent
    },

      // {path : 'students',
      //  loadChildren: () => import('./students/students.module').then(m => m.studentsModule) 
      // },
      // {path : 'supers',
      // loadChildren: () => import('./super/super.module').then(m => m.SuperModule) 
      // }
    ],{preloadingStrategy: PreloadAllModules }),
    BrowserAnimationsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass : InterceptorService , multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
