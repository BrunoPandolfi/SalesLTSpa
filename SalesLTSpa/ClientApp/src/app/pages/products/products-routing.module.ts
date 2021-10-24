import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { FormDataProductComponent } from './form-data-product/form-data-product.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsIndexComponent } from './products-index/products-index.component';
import { ProductsResolver } from './products.resolver';

const routes: Routes = [
  {path:'Products', component: ProductsIndexComponent, children:[
    {
      path: 'Create', 
      component: FormDataProductComponent
    },
    {
      path: 'Edit/:id', 
      resolve: {
        product: ProductsResolver
      },
      component: FormDataProductComponent
    },
    {
      path: 'Details/:id', 
      resolve: {
        product: ProductsResolver
      },
      component: ProductsDetailsComponent
    },
    {
      path: 'Delete/:id',
      resolve: {
        product: ProductsResolver
      },
      component: DeleteProductComponent
    }
  ]},
  {
    path: '', pathMatch: 'full',  redirectTo: 'Products'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
