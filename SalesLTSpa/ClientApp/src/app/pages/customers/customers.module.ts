import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersIndexComponent } from './customers-index/customers-index.component';


@NgModule({
  declarations: [ CustomersIndexComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ],
  exports: [
    CustomersIndexComponent
  ]
})
export class CustomersModule { }
