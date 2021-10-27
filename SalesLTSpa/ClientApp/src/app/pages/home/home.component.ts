import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
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
  faBars = faBars;

  constructor(
    private salesOrderService: SalesOrderService,
    private customerService: CustomerService,
    private toastrService: ToastrService
   
  ) { 

  }

  ngOnInit(): void {
    this.salesOrderService.updateSalesOrderList().subscribe(data=>{
      this.salesOrders = data;
      let arrLength = this.salesOrders.length;
      this.salesOrdersLimit = this.salesOrders.slice(0, this.maxNumber);
    });
    this.customerService.getAllCustomersAndSalesOrder().subscribe(data=>{
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
      totalSalesOrder += this.salesOrderService.getTotalSalesOrder(obj);
    });
    return totalSalesOrder;
  }
}
