import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isSubmitted: boolean;
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
      CustomerID: [0],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      EmailAddress: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      BirthDate: ['', [Validators.required]]
    });
    if (this.customerID) {
      //console.log(this.customerID);
      this.customerService.getCustomerById(this.customerID).subscribe((customer: any) => {
        //console.log(customer);
        this.formCustomer.setValue({
          CustomerID: customer.customerID,
          FirstName: customer.firstName,
          LastName: customer.lastName,
          EmailAddress: customer.emailAddress,
          Phone: customer.phone,
          BirthDate: pipe.transform(customer.birthDate, 'yyyy-MM-dd')
        });
      });
    }
    else {
      return;
    }
  }

  postCustomer() {
    if (this.formCustomer.valid) {
      this.customerService.postCustomer(this.formCustomer.value).subscribe((data) => {
        this.customerService.updateCustomerList();
        this.router.navigate(['/Customers']);
      });
    }
    else {
      console.log(this.formCustomer);
      Object.keys(this.formCustomer.controls).forEach(field => {
        const control = this.formCustomer.get(field);
        control?.markAsDirty();
        if (control instanceof FormGroup) {
          this.isValid(control);
        }
      })
    }
  }


  isValid(fieldName) {
    var field = this.formCustomer.controls[fieldName];
    return !field.valid && (field.touched || field.dirty);
  }

  getFieldName(field) {
    var name = "";
    switch (field) {
      case 'FirstName':
        name = "Nome";
        break;
      case 'LastName':
        name = 'Sobrenome';
        break;
      case 'EmailAddress':
        name = 'Email';
        break;
      case 'Phone':
        name = 'Telefone';
        break;
      case 'BirthDate':
        name = 'Data de Nascimento';
        break;
    }
    return name;
  }

  putCustomer() {
    if (this.formCustomer.valid) {
      //console.log(this.formCustomer);
      this.customerService.putCustomer(this.customerID, this.formCustomer.value).subscribe((data) => {
        //console.log(data);
        this.customerService.updateCustomerList();
        this.router.navigate(['/Customers']);
      });
    }
    else {
      //console.log(this.formCustomer);
      Object.keys(this.formCustomer.controls).forEach(field => {
        const control = this.formCustomer.get(field);
        control?.markAsDirty();
        if (control instanceof FormGroup) {
          this.isValid(control);
        }
      })
    }
  }

  voltarIndex() {
    this.router.navigate(["/Customers"]);
  }
}
