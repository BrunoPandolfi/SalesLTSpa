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
import { SharedModule } from 'src/app/components/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ProductsIndexComponent,
    ProductsDetailsComponent,
    FormDataProductComponent,
    DeleteProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
    
  ],
  exports: [
    ProductsIndexComponent,
    ProductsDetailsComponent
  ]
})
export class ProductsModule { }
