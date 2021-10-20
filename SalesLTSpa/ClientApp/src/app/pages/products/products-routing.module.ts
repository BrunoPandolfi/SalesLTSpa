import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { FormDataProductComponent } from './form-data-product/form-data-product.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsIndexComponent } from './products-index/products-index.component';

const routes: Routes = [
  {path:'Products', component: ProductsIndexComponent, children:[
    {
      path: 'Create', 
      component: FormDataProductComponent
    },
    {
      path: 'Edit/:id', 
      component: FormDataProductComponent
    },
    {
      path: 'Details/:id', 
      component: ProductsDetailsComponent
    },
    {
      path: 'Delete/:id',
      component: DeleteProductComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
