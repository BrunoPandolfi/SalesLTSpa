import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  customer: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customer = this.activatedRoute.snapshot.data['customer'];
    
  }

  deleteCustomer(){
    this.customerService.deleteCustomer(this.customer.customerID).subscribe(()=>{
        this.customerService.updateCustomerList();
        this.router.navigate(['/Customers']);
    }, 
    error =>{
      console.log(error);
    }
    );
  }

}
