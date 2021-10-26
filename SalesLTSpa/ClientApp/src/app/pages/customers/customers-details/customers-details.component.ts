import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPortrait } from '@fortawesome/free-solid-svg-icons';
import { SalesOrderService } from '../../sales-order/sales-order.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.css']
})
export class CustomersDetailsComponent implements OnInit {
  faPortrait = faPortrait;
  customer: any;
  loading: boolean;
  salesOrders: any;
  loadingSales: boolean;

  constructor(
    private customerService: CustomerService,
    private salesOrderService: SalesOrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.loading = true;
    this.loadingSales = true;
  }

  ngOnInit(): void {
    this.customer = this.activatedRoute.snapshot.data['customer'];
    this.loading = false;
  }

  getSalesOrdersCustomer(){
    let customerID = this.customer.customerID;
    this.customerService.getSalesOrders(customerID).subscribe((data: any)=>{
      this.salesOrders = data;
      console.log(this.salesOrders);
      this.loadingSales = false;
    });
  }

  getStatusMessage(status){
    return this.salesOrderService.getStatusMessage(status);
  }

  getColorStatus(status){
    return this.salesOrderService.getColorStatus(status);
  }
  /*detailsSalesOrder(id){
    this.router.navigate()
  }*/
}
