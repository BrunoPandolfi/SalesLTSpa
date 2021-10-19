import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers-index',
  templateUrl: './customers-index.component.html',
  styleUrls: ['./customers-index.component.css']
})
export class CustomersIndexComponent implements OnInit {

  data: any;

  constructor(private customerService : CustomerService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getAllCustomers().subscribe( (data: any) =>{
      this.data = data;
    });
  }
}
