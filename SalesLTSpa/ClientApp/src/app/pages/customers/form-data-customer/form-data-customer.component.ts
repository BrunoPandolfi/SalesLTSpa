import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { pipe } from 'rxjs';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-form-data-customer',
  templateUrl: './form-data-customer.component.html',
  styleUrls: ['./form-data-customer.component.css']
})
export class FormDataCustomerComponent implements OnInit {

  faUserPlus = faUserPlus;
  faUserEdit = faUserEdit;
  customer: any;
  formCustomer: FormGroup;
  isSubmitted: boolean;
  titlePage: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) {
      
  }

  ngOnInit(): void {
    //this.customerID = this.activatedRoute.snapshot.paramMap.get('id');
    this.customer = this.activatedRoute.snapshot.data['customer'];
    const pipe = new DatePipe('en-US');
    this.formCustomer = this.formBuilder.group({
      CustomerID: [0],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      EmailAddress: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      BirthDate: ['', [Validators.required]]
    });
    if (this.customer !== undefined) {
      this.titlePage = "Editar dados do cliente";
      this.formCustomer.setValue({
        CustomerID: this.customer.customerID,
        FirstName: this.customer.firstName,
        LastName: this.customer.lastName,
        EmailAddress: this.customer.emailAddress,
        Phone: this.customer.phone,
        BirthDate: pipe.transform(this.customer.birthDate, 'yyyy-MM-dd')
      })
    }
    else {
      this.titlePage = "Criar novo cliente";
      return;
    }
  }

  postCustomer() {
    if (this.formCustomer.valid) {
      this.customerService.postCustomer(this.formCustomer.value).subscribe((data) => {
        this.customerService.updateCustomerList();
        this.router.navigate(['/Customers']);
      });
      this.toastrService.success('Cliente adicionado com sucesso!!', 'Sucesso');
    }
    else {
      Object.keys(this.formCustomer.controls).forEach(field => {
        const control = this.formCustomer.get(field);
        control?.markAsDirty();
        if (control instanceof FormGroup) {
          this.isValid(control);
        }
      })
      this.toastrService.error('Alguns dados estão faltando!!', 'Erro');
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
      var customerID = this.customer.customerID;
      this.customerService.putCustomer(customerID, this.formCustomer.value).subscribe((data) => {
        this.customerService.updateCustomerList();
        this.router.navigate(['/Customers']);
      });
      this.toastrService.success('Dados do cliente atualizados com sucesso!!', 'Sucesso');
    }
    else {
      Object.keys(this.formCustomer.controls).forEach(field => {
        const control = this.formCustomer.get(field);
        control?.markAsDirty();
        if (control instanceof FormGroup) {
          this.isValid(control);
        }
      })
      this.toastrService.error('Alguns dados estão faltando!!', 'Erro');
    }
  }

  voltarIndex() {
    this.router.navigate(["/Customers"]);
  }
}
