import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './components/header/header.module';
import { CustomersModule } from './pages/customers/customers.module';
import { HomeModule } from './pages/home/home.module';
import { ProductsModule } from './pages/products/products.module';

import ptBr from '@angular/common/locales/pt';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SalesOrderModule } from './pages/sales-order/sales-order.module';
import { AddHeaderComponent } from './components/create-salesorder/add-header/add-header.component';
import { AddProductsComponent } from './components/create-salesorder/add-products/add-products.component';
import { ResumeSalesorderComponent } from './components/create-salesorder/resume-salesorder/resume-salesorder.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    CustomersModule,
    HomeModule,
    ProductsModule,
    FontAwesomeModule,
    SalesOrderModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue:'pt'},
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
