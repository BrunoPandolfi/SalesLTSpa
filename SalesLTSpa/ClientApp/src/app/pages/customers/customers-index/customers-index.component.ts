import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers-index',
  templateUrl: './customers-index.component.html',
  styleUrls: ['./customers-index.component.css']
})
export class CustomersIndexComponent implements OnInit {

  faUsers = faUsers;
  customers: any;

  constructor(private customerService : CustomerService,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.updateCustomerList().subscribe( (customersList: any) =>{
      this.customers = customersList;
    });
  }

  criarNovoCliente(){
    this.router.navigate(['Create'], {relativeTo: this.route})
  }
}
