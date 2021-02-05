// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule,PreloadAllModules } from '@angular/router';
// import { ReactiveFormsModule,FormsModule } from '@angular/forms';
// import {MatCardModule} from '@angular/material/card';
// import { MatExpansionModule } from '@angular/material/expansion';
// import {MatIconModule} from '@angular/material/icon';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import {MatRadioModule} from '@angular/material/radio';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import {MatGridListModule} from '@angular/material/grid-list';
// import { ListComponent } from './list.component';
// import { AddComponent } from './add.component';
// import { UpdateComponent } from './update.component';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { OrdersComponent } from './orders.component';
// import {AuthGuard}  from '../auth.guard';
// import { HomeComponent } from './home.component';


// @NgModule({
//   declarations: [ListComponent, AddComponent, UpdateComponent, OrdersComponent, HomeComponent],
//   imports: [
//     CommonModule,
//     MatIconModule,
//     MatExpansionModule,
//     ReactiveFormsModule,
//     MatGridListModule,
//     RouterModule.forChild([
//       {path :'', component: HomeComponent,canActivate :[AuthGuard]},
//       {path :'list', component: ListComponent,canActivate :[AuthGuard]},
//       {path :'add', component: AddComponent,canActivate :[AuthGuard]},
//       {path :'orders', component: OrdersComponent,canActivate :[AuthGuard]},
//       {path :'list/update', component: UpdateComponent,canActivate :[AuthGuard]},
//     ]),
//     MatCardModule,
//     MatAutocompleteModule,
//     MatRadioModule,
//     MatToolbarModule,
//     FlexLayoutModule
//   ],
//     exports:[ListComponent, AddComponent,UpdateComponent,OrdersComponent,HomeComponent],

// })
// export class FarmersModule { }
