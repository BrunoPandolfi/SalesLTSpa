import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customers/customer.service';
import { SalesOrderService } from '../sales-order/sales-order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  salesOrders: any;
  salesOrdersLimit: any;
  maxNumber = 5;
  customers: any;

  constructor(
    private salesOrderService: SalesOrderService,
    private customerService: CustomerService
   
  ) { 

  }

  ngOnInit(): void {
    this.salesOrderService.updateSalesOrderList().subscribe(data=>{
      console.log(data);
      this.salesOrders = data;
      let arrLength = this.salesOrders.length;
      this.salesOrdersLimit = this.salesOrders.slice(0, this.maxNumber);
    });
    this.customerService.getAllCustomersAndSalesOrder().subscribe(data=>{
      console.log(data);
      this.customers = data;
    })
  }

  getColorStatus(status){
    return this.salesOrderService.getColorStatus(status);
  }

  getStatusMessage(status){
    return this.salesOrderService.getStatusMessage(status);
  }

  getTotalSalesOrderCustomer(salesOrders){
    var totalSalesOrder = 0;
    salesOrders.map((obj)=> {
      //console.log(obj.subTotal);
      totalSalesOrder += this.salesOrderService.getTotalSalesOrder(obj);
    });
    //console.log("Total Sales: " + totalSalesOrder);
    return totalSalesOrder;
  }
}
