import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.css']
})
export class CustomersDetailsComponent implements OnInit {
  customer: any;
  loading: boolean;
  salesOrders: any;
  loadingSales: boolean;

  constructor(
    private customerService: CustomerService,
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

  /*detailsSalesOrder(id){
    this.router.navigate()
  }*/
}
