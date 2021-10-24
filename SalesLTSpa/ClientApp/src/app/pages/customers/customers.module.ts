import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersIndexComponent } from './customers-index/customers-index.component';
import { CustomersDetailsComponent } from './customers-details/customers-details.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { FormDataCustomerComponent } from './form-data-customer/form-data-customer.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { SharedModule } from 'src/app/components/shared/shared.module';


@NgModule({
  declarations: [ 
    CustomersIndexComponent, 
    CustomersDetailsComponent, 
    DeleteCustomerComponent, 
    FormDataCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    CustomersIndexComponent
  ]
})
export class CustomersModule { }
