import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsIndexComponent } from './products-index/products-index.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { FormDataProductComponent } from './form-data-product/form-data-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsIndexComponent,
    ProductsDetailsComponent,
    FormDataProductComponent,
    DeleteProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductsIndexComponent,
    ProductsDetailsComponent
  ]
})
export class ProductsModule { }
