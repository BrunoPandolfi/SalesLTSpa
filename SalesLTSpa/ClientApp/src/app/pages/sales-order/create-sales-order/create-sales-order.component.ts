import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsRoutingModule } from '../../products/products-routing.module';
import { SalesOrderService } from '../sales-order.service';

@Component({
  selector: 'app-create-sales-order',
  templateUrl: './create-sales-order.component.html',
  styleUrls: ['./create-sales-order.component.css']
})
export class CreateSalesOrderComponent implements OnInit {
  customers: any;
  products: any;
  stepOne: boolean;
  stepTwo: boolean;
  stepThree: boolean;
  salesOrderComplete: any;
  salesOrderDetails: any[] = [];
  firstCustomer: number;


  constructor(
    public activatedRoute: ActivatedRoute,
    private salesOrderService: SalesOrderService,
    private router: Router,
  ) { 
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
  }

  ngOnInit(): void {
    this.salesOrderService.getSalesOrderForm().subscribe((data: any)=>{
      this.customers = data.customers;
      this.products = data.products;
      this.salesOrderComplete = data;
      this.products.forEach(v => {v.OrderQty = 0, v.Added = false});
      console.log(this.customers[1].customerID);
      this.firstCustomer = this.customers[1].customerID;
    });
  }

  advanceResume(){
    //console.log(this.formSalesOrder.value);
    this.stepTwo = false;
    this.stepThree = true;
    this.salesOrderComplete["salesOrderDetails"] = this.salesOrderDetails;
    console.log(this.salesOrderComplete);
  }

  backToStepTwo(){
    this.stepTwo = true;
    this.stepThree = false;
  }

  removeProductItem(index, product)
  {
    var indexProduct = this.products.findIndex((obj => obj.name === product.name))
    this.products[indexProduct].OrderQty = 0;
    this.products[indexProduct].Added = false;
    this.salesOrderDetails.splice(index, 1);
    //console.log(this.products);
  }

  addSalesOrderHeader(event){
    //console.log(event);
    this.salesOrderComplete.salesOrderHeader = event;
    console.log(this.salesOrderComplete);
    this.stepOne = false;
    this.stepTwo = true;
  }

  addSalesOrderDetails(event){
    this.salesOrderComplete.salesOrderDetails = event;
    console.log(this.salesOrderComplete);
    this.stepTwo = false;
    this.stepThree = true;
  }

  createNewSalesOrder(event){
    this.salesOrderComplete = event;
    console.log(this.salesOrderComplete);
    this.salesOrderService.postSalesOrder(this.salesOrderComplete).subscribe(()=>{
      this.salesOrderService.updateSalesOrderList();
      this.router.navigate(["/SalesOrder"]);
    });
  }
}
