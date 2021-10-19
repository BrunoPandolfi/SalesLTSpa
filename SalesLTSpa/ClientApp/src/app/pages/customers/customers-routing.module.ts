import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersIndexComponent } from './customers-index/customers-index.component';
import { FormDataCustomerComponent } from './form-data-customer/form-data-customer.component';

const routes: Routes = [
  {path:'Customers', component: CustomersIndexComponent, children:[
    {
      path: 'Create', component: FormDataCustomerComponent
    },
    {
      path: 'Edit/:id', component: FormDataCustomerComponent
    },
    {
      path: 'Details/:id', component: FormDataCustomerComponent
    },
    {
      path: 'Delete/:id', component: FormDataCustomerComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
