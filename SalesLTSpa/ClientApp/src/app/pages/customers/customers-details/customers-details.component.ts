import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.css']
})
export class CustomersDetailsComponent implements OnInit {
  customer: any;
  loading: boolean;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.loading = true;
  }

  ngOnInit(): void {
    this.customer = this.activatedRoute.snapshot.data['customer'];
    this.loading = false;
  }
}
