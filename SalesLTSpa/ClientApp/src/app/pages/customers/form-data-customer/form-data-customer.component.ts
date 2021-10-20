import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-form-data-customer',
  templateUrl: './form-data-customer.component.html',
  styleUrls: ['./form-data-customer.component.css']
})
export class FormDataCustomerComponent implements OnInit {

  customerID: any;
  formCustomer: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) { 
    
  }

  ngOnInit(): void {
    this.customerID = this.activatedRoute.snapshot.paramMap.get('id');
    var customer = {};
    const pipe = new DatePipe('en-US');
    this.formCustomer = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      EmailAddress: [''],
      Phone: [''],
      BirthDate: ['']
    });
    if (this.customerID)
    {
      //console.log(this.customerID);
      this.customerService.getCustomerById(this.customerID).subscribe((customer : any) =>{
        //console.log(customer);
        this.formCustomer = this.formBuilder.group({
          CustomerID: [customer.customerID],
          FirstName: [customer.firstName],
          LastName: [customer.lastName],
          EmailAddress: [customer.emailAddress],
          Phone: [customer.phone],
          BirthDate: [pipe.transform(customer.birthDate, 'yyyy-MM-dd')]
        });
      });
    }
    else{
      //console.log("Nenhum id passado");
      return;
    }
  }

  postCustomer(){
    //console.log(this.formCustomer.value);
    this.customerService.postCustomer(this.formCustomer.value).subscribe((data)=>{
      //console.log(data);
      this.customerService.updateCustomerList();
      this.router.navigate(['/Customers']);
    })
  }

  putCustomer(){
    
    this.customerService.putCustomer(this.customerID, this.formCustomer.value).subscribe((data)=>{
      //console.log(data);
      this.customerService.updateCustomerList();
      this.router.navigate(['/Customers']);
    })
  }

  voltarIndex(){
    this.router.navigate(["/Customers"]);
  }
}
