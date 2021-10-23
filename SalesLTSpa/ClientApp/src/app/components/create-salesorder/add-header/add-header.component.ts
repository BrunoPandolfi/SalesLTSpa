import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-header',
  templateUrl: './add-header.component.html',
  styleUrls: ['./add-header.component.css']
})
export class AddHeaderComponent implements OnInit {

  @Input() show;
  @Input() customers;
  @Output() newSalesOrderHeader = new EventEmitter<any>();
  formSalesOrder: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formSalesOrder = this.formBuilder.group({
      PurchaseOrderNumber: [null],
      OrderDate: [null],
      OnlineOrderFlag: ['s'],
      Comment: [null],
      CustomerID: [null]
    });
  }

  onSubmit(){
    //console.log(this.formSalesOrder.value);
    var salesOrderHeader = this.formSalesOrder.value;
    salesOrderHeader.Customer = this.customers[salesOrderHeader.CustomerID-1];
    salesOrderHeader.SubTotal = 0.00;
    salesOrderHeader.TaxAmt = 0.00;
    //console.log(salesOrderHeader);
    this.newSalesOrderHeader.emit(salesOrderHeader);
  }

}
