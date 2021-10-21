import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesOrderRoutingModule } from './sales-order-routing.module';
import { CreateSalesOrderComponent } from './create-sales-order/create-sales-order.component';
import { SalesOrderDetailsComponent } from './sales-order-details/sales-order-details.component';
import { SalesOrderIndexComponent } from './sales-order-index/sales-order-index.component';
import { DeleteSalesOrderComponent } from './delete-sales-order/delete-sales-order.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    CreateSalesOrderComponent,
    SalesOrderDetailsComponent,
    SalesOrderIndexComponent,
    DeleteSalesOrderComponent
  ],
  imports: [
    CommonModule,
    SalesOrderRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports:[
    CreateSalesOrderComponent,
    SalesOrderDetailsComponent,
    SalesOrderIndexComponent,
    DeleteSalesOrderComponent
  ]
})
export class SalesOrderModule { }
