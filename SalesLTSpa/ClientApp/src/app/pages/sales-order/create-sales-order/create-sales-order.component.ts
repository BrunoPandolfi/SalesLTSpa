import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faMinusCircle, faPlus, faPlusCircle, faPray } from '@fortawesome/free-solid-svg-icons';
import { ProductsRoutingModule } from '../../products/products-routing.module';
import { SalesOrderService } from '../../sales-order.service';

@Component({
  selector: 'app-create-sales-order',
  templateUrl: './create-sales-order.component.html',
  styleUrls: ['./create-sales-order.component.css']
})
export class CreateSalesOrderComponent implements OnInit {

  formSalesOrder: FormGroup;
  customers: any;
  products: any;
  stepOne: boolean;
  stepTwo: boolean;
  stepThree: boolean;
  salesOrderComplete: any;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faPlus = faPlus;
  salesOrderDetails: any[] = [];


  constructor(
    public activatedRoute: ActivatedRoute,
    private salesOrderService: SalesOrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
  }

  ngOnInit(): void {
    this.formSalesOrder = this.formBuilder.group({
      PurchaseOrderNumber: [null],
      OrderDate: [null],
      OnlineOrderFlag: ['s'],
      Comment: [null],
      CustomerID: [null]
    });
    this.salesOrderService.getSalesOrderForm().subscribe((data: any)=>{
      console.log(data.products);
      //this.formSalesOrder = data;
      this.customers = data.customers;
      this.products = data.products;
      this.salesOrderComplete = data;
      this.products.forEach(v => {v.OrderQty = 0, v.Added = false});
    });
  }

  onSubmit(){
    console.log(this.formSalesOrder.value);
    this.stepOne = false;
    this.stepTwo = true;
    var salesOrderHeader = this.formSalesOrder.value;
    salesOrderHeader.Customer = this.customers[salesOrderHeader.CustomerID-1];
    this.salesOrderComplete["salesOrderHeader"] = salesOrderHeader;
    console.log(this.salesOrderComplete);
  }

  advanceResume(){
    //console.log(this.formSalesOrder.value);
    this.stepTwo = false;
    this.stepThree = true;
    this.salesOrderComplete["salesOrderDetails"] = this.salesOrderDetails;
    console.log(this.salesOrderComplete);
  }

  getImageServer(imgPath){
    return `http://localhost:1168/${imgPath}`;
  }

  addQty (product){
    product.OrderQty += 1;
  }

  subQty (product){
    if (product.OrderQty > 0)
    {
      product.OrderQty -= 1;
    }
  }

  createSalesOrderDetail(product){
    if(product.OrderQty === 0)
    {
      return;
    }
    var orderQty = product.OrderQty;
    var chooseProduct = product;
    delete chooseProduct['Added'];
    delete chooseProduct['OrderQty'];

    this.salesOrderDetails.push({
      "OrderQty": orderQty,
      "UnitPrice": chooseProduct.listPrice,
      "ProductID": chooseProduct.productID,
      "Product": chooseProduct
    });
    product["Added"] = true;
    console.log(this.salesOrderDetails);
  }

  removeProductItem(index, product)
  {
    var indexProduct = this.products.findIndex((obj => obj.name === product.name))
    this.products[indexProduct].OrderQty = 0;
    this.products[indexProduct].Added = false;
    this.salesOrderDetails.splice(index, 1);
    //console.log(this.products);
  }

}
