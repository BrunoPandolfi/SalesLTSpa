import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { ProductsRoutingModule } from '../../products/products-routing.module';
import { SalesOrderService } from '../sales-order.service';

@Component({
  selector: 'app-create-sales-order',
  templateUrl: './create-sales-order.component.html',
  styleUrls: ['./create-sales-order.component.css']
})
export class CreateSalesOrderComponent implements OnInit {
  faCartPlus = faCartPlus;
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
    private toastrService: ToastrService
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
      this.products.forEach(v => {v.OrderQty = 1, v.Added = false});
      this.firstCustomer = this.customers[1].customerID;
    });
  }

  advanceResume(){
    this.stepTwo = false;
    this.stepThree = true;
    this.salesOrderComplete["salesOrderDetails"] = this.salesOrderDetails;
  }

  backToStepOne(){
    this.stepTwo = false;
    this.stepOne = true;
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
  }

  addSalesOrderHeader(event){
    this.salesOrderComplete.salesOrderHeader = event;
    this.stepOne = false;
    this.stepTwo = true;
  }

  addSalesOrderDetails(event){
    this.salesOrderComplete.salesOrderDetails = event;
    this.stepTwo = false;
    this.stepThree = true;
  }

  createNewSalesOrder(event){
    this.salesOrderComplete = event;
    this.salesOrderService.postSalesOrder(this.salesOrderComplete).subscribe(()=>{
      this.salesOrderService.updateSalesOrderList();
      this.router.navigate(["/SalesOrder"]);
    });
    this.toastrService.success('Pedido gerado com sucesso', 'Sucesso');
  }
}
