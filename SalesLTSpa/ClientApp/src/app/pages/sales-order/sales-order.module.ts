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
import { HttpClientModule } from '@angular/common/http';
import { AddHeaderComponent } from 'src/app/components/create-salesorder/add-header/add-header.component';
import { AddProductsComponent } from 'src/app/components/create-salesorder/add-products/add-products.component';
import { ResumeSalesorderComponent } from 'src/app/components/create-salesorder/resume-salesorder/resume-salesorder.component';
import { EditSalesOrderComponent } from './edit-sales-order/edit-sales-order.component';
import { AddDiscountComponent } from 'src/app/components/create-salesorder/add-discount/add-discount.component';
import { SharedModule } from 'src/app/components/shared/shared.module';


@NgModule({
  declarations: [
    CreateSalesOrderComponent,
    SalesOrderDetailsComponent,
    SalesOrderIndexComponent,
    DeleteSalesOrderComponent,
    AddHeaderComponent,
    AddProductsComponent,
    ResumeSalesorderComponent,
    EditSalesOrderComponent,
    AddDiscountComponent
  ],
  imports: [
    CommonModule,
    SalesOrderRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    CreateSalesOrderComponent,
    SalesOrderDetailsComponent,
    SalesOrderIndexComponent,
    DeleteSalesOrderComponent,
    AddHeaderComponent,
    AddProductsComponent,
    ResumeSalesorderComponent,
    EditSalesOrderComponent,
    AddDiscountComponent
  ]
})
export class SalesOrderModule { }
