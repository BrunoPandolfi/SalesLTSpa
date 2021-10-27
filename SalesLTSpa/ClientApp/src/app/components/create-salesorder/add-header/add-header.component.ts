import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-header',
  templateUrl: './add-header.component.html',
  styleUrls: ['./add-header.component.css']
})
export class AddHeaderComponent implements OnInit {
  loading: boolean;
  @Input() show;
  @Input() customers: any;
  @Input() selection: number;
  @Output() newSalesOrderHeader = new EventEmitter<any>();
  formSalesOrder: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { 
    this.loading = true;
  }

  ngOnInit(): void {
    let customerID = 0;
    customerID = this.customers[0].customerID;
    this.formSalesOrder = this.formBuilder.group({
      PurchaseOrderNumber: [null, [Validators.required]],
      OrderDate: [null, [Validators.required]],
      OnlineOrderFlag: ['s'],
      Comment: [null],
      CustomerID: [customerID]
    });
    this.loading = false;
  }

  onSubmit() {
    if (this.formSalesOrder.valid) {
      var salesOrderHeader = this.formSalesOrder.value;
      if (salesOrderHeader.OnlineOrderFlag === 's'){
        salesOrderHeader.OnlineOrderFlag = true;
      }
      else {
        salesOrderHeader.OnlineOrderFlag = false;
      }
      salesOrderHeader.CustomerID = Number.parseInt(salesOrderHeader.CustomerID)
      let indexCustomer = this.findIndexCustomer(salesOrderHeader.CustomerID);
      salesOrderHeader.Customer = this.customers[indexCustomer];
      salesOrderHeader.SubTotal = 0.00;
      salesOrderHeader.TaxAmt = 0.00;
      this.newSalesOrderHeader.emit(salesOrderHeader);
    }
    else{
      Object.keys(this.formSalesOrder.controls).forEach(field => {
        const control = this.formSalesOrder.get(field);
        control?.markAsDirty();
        if (control instanceof FormGroup) {
          this.isValid(control);
        }
      })
      this.toastrService.error('Alguns dados estão faltando!!', 'Erro');
    }
  }

  findIndexCustomer(customerID){
    let index =  this.customers.findIndex((customer=> customer.customerID === customerID));
    return index;
  }

  isValid(fieldName) {
    var field = this.formSalesOrder.controls[fieldName];
    return !field.valid && (field.touched || field.dirty);
  }

  getFieldName(field) {
    var name = "";
    switch (field) {
      case 'PurchaseOrderNumber':
        name = "Numero da ordem de pedido";
        break;
      case 'OrderDate':
        name = 'Data do pedido';
        break;
    }
    return name;
  }

}
