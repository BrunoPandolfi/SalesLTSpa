import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) { 
    this.loading = true;
  }

  ngOnInit(): void {
    this.formSalesOrder = this.formBuilder.group({
      PurchaseOrderNumber: [null, [Validators.required]],
      OrderDate: [null, [Validators.required]],
      OnlineOrderFlag: ['s'],
      Comment: [null],
      CustomerID: [1]
    });
    setTimeout(()=>{
      console.log(this.selection);
    });
    this.loading = false;
  }

  onSubmit() {
    if (this.formSalesOrder.valid) {
      //console.log(this.formSalesOrder.value);
      var salesOrderHeader = this.formSalesOrder.value;
      if (salesOrderHeader.OnlineOrderFlag === 's'){
        salesOrderHeader.OnlineOrderFlag = true;
      }
      else {
        salesOrderHeader.OnlineOrderFlag = false;
      }
      salesOrderHeader.Customer = this.customers[salesOrderHeader.CustomerID - 1];
      salesOrderHeader.SubTotal = 0.00;
      salesOrderHeader.TaxAmt = 0.00;
      console.log(salesOrderHeader);
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
    }
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
