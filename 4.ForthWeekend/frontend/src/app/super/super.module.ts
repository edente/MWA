import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// import { studentsComponent } from './students.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CustomersComponent } from './customers.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LogfilesComponent } from './logfiles.component';
// import { TransactionsComponent } from './transactions.component';
import { ResetComponent } from './reset.component';
import {AuthGuard}  from '../auth.guard';


@NgModule({
  declarations: [ CustomersComponent, LogfilesComponent,ResetComponent],
  imports: [
    CommonModule, 
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatToolbarModule,
    RouterModule.forChild([
      // {path :'students', component: studentsComponent,canActivate :[AuthGuard]},
      {path :'customers', component: CustomersComponent,canActivate :[AuthGuard]},
      // {path :'transactions', component: TransactionsComponent,canActivate :[AuthGuard]},
      {path :'files', component: LogfilesComponent,canActivate :[AuthGuard]},
      {path :'students/resets', component: ResetComponent,canActivate :[AuthGuard]},
      {path :'customers/resets', component: ResetComponent,canActivate :[AuthGuard]}


    ])
  ],
  exports: [CustomersComponent, LogfilesComponent, ResetComponent]

})
export class SuperModule { }
