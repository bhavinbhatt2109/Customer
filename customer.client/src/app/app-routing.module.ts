import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AddComponent } from './customer/add/add.component';
import { EditComponent } from './customer/edit/edit.component';

const routes: Routes = [
  {path:'',redirectTo:'/customer',pathMatch:'full'},
  {path:'customer',component:CustomerComponent},
  {path:'add',component:AddComponent},
  {path:'edit',component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
