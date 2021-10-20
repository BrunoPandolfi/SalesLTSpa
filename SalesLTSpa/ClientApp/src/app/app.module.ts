import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './components/header/header.module';
import { CustomersIndexComponent } from './pages/customers/customers-index/customers-index.component';
import { CustomersModule } from './pages/customers/customers.module';
import { HomeComponent } from './pages/home/home.component';
import { HomeModule } from './pages/home/home.module';
import { ProductsIndexComponent } from './pages/products/products-index/products-index.component';
import { ProductsDetailsComponent } from './pages/products/products-details/products-details.component';
import { ProductsModule } from './pages/products/products.module';

import ptBr from '@angular/common/locales/pt';
import { CurrencyPipe, registerLocaleData } from '@angular/common';

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
    ProductsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue:'pt'},
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
