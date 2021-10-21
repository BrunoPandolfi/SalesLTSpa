import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteCustomerComponent } from '../customers/delete-customer/delete-customer.component';
import { CreateSalesOrderComponent } from './create-sales-order/create-sales-order.component';
import { SalesOrderDetailsComponent } from './sales-order-details/sales-order-details.component';
import { SalesOrderIndexComponent } from './sales-order-index/sales-order-index.component';

const routes: Routes = [
  {path: 'SalesOrder', component: SalesOrderIndexComponent, children: [
    {path: 'Create', component: CreateSalesOrderComponent},
    {path: 'Details', component: SalesOrderDetailsComponent},
    {path: 'Delete', component: DeleteCustomerComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrderRoutingModule { }
