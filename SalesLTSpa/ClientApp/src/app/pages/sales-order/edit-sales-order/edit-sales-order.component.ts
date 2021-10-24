import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
import { SalesOrderService } from '../sales-order.service';

@Component({
  selector: 'app-edit-sales-order',
  templateUrl: './edit-sales-order.component.html',
  styleUrls: ['./edit-sales-order.component.css']
})
export class EditSalesOrderComponent implements OnInit {
  loading: boolean;
  salesOrder: any;
  salesOrderForm: FormGroup;
  customers: any;
  products: any;
  salesOrderHeader: any;
  salesOrderDetails: any;
  constructor(
    private salesOrderService: SalesOrderService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    const datePipe = new DatePipe('en-US');
    const currencyPipe = new CurrencyPipe('pt-BR');
    this.salesOrder = this.activatedRoute.snapshot.data['salesOrder'];
    console.log(this.salesOrder);
    this.salesOrderForm = this.formBuilder.group({
      SalesOrderHeaderID: [null],
      PurchaseOrderNumber: [null, [Validators.required]],
      Status: [null],
      OrderDate: [null, [Validators.required]],
      OnlineOrderFlag: ['n'],
      SubTotal: [null],
      TaxAmt: [null],
      Comment: [null],
      CustomerID: [null]
    });
    this.customers = this.salesOrder.customers;
    this.products = this.salesOrder.products;
    //this.salesOrderHeader = this.salesOrder.salesOrderHeader;
    this.salesOrderDetails = this.salesOrder.salesOrderDetails;
    console.log(this.salesOrder);
    this.salesOrderForm.setValue({
      SalesOrderHeaderID: this.salesOrder.salesOrderHeaderID,
      PurchaseOrderNumber: this.salesOrder.purchaseOrderNumber,
      Status: this.salesOrder.status.toString(),
      OrderDate: datePipe.transform(this.salesOrder.orderDate, 'yyyy-MM-dd'),
      OnlineOrderFlag: 's',
      SubTotal: this.salesOrder.subTotal.toFixed(2).replace('.', ','),
      TaxAmt: this.salesOrder.taxAmt.toFixed(2).replace('.', ','),
      Comment: this.salesOrder.comment,
      CustomerID: this.salesOrder.customerID
    });
    this.loading = false;
}



updateHeader()
{
  if (this.salesOrderForm.valid) {
    if (this.salesOrderForm.controls['OnlineOrderFlag'].value === 's') {
      this.salesOrderForm.patchValue({
        OnlineOrderFlag: true
      });
    }
    else {
      this.salesOrderForm.patchValue({
        OnlineOrderFlag: false
      });
    }
    this.salesOrderForm.patchValue({
      SubTotal: Number.parseFloat(this.salesOrderForm.controls['SubTotal'].value),
      TaxAmt: Number.parseFloat(this.salesOrderForm.controls['TaxAmt'].value)
    });
    const salesOrderID = this.salesOrderHeader.salesOrderHeaderID;
    this.salesOrderService.putSalesOrderHeader(salesOrderID, this.salesOrderForm.value).subscribe((result) => {
      this.salesOrderService.updateSalesOrderList();
      this.router.navigate(["/SalesOrder"]);
    });
  }
  else {
    Object.keys(this.salesOrderForm.controls).forEach(field => {
      const control = this.salesOrderForm.get(field);
      control?.markAsDirty();
      if (control instanceof FormGroup) {
        this.isValid(control);
      }
    });
  }
}

isValid(fieldName) {
  var field = this.salesOrderForm.controls[fieldName];
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
