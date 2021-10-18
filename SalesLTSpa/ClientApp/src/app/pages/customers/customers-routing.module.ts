import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersIndexComponent } from './customers-index/customers-index.component';

const routes: Routes = [
  {path:'Customers', component: CustomersIndexComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
