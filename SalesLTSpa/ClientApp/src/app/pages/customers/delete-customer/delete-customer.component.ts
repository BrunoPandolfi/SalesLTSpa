import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faExclamationTriangle, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  faUserMinus = faUserMinus;
  customer: any;
  error: boolean;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) { 
    this.error = false;
  }

  ngOnInit(): void {
    this.customer = this.activatedRoute.snapshot.data['customer'];
  }

  deleteCustomer(){
    this.customerService.deleteCustomer(this.customer.customerID).subscribe(()=>{
        this.customerService.updateCustomerList();
        this.router.navigate(['/Customers']);
    }, 
    erro =>{
      this.message = erro.error;
      this.error = true;
    }
    );
  }

}
