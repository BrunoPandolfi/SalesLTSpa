import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  salesOrderID: any;
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
    this.salesOrderID = this.activatedRoute.snapshot.paramMap.get("id");
    this.salesOrderForm = this.formBuilder.group({
      SalesOrderHeaderID: [null],
      PurchaseOrderNumber: [null],
      Status: [null],
      OrderDate: [null],
      OnlineOrderFlag: ['n'],
      SubTotal: [null],
      TaxAmt: [null],
      Comment: [null],
      CustomerID: [null]
    });
    this.salesOrderService.getSalesOrderEdit(this.salesOrderID).subscribe((data: any)=>{
      this.salesOrder = data;
      this.customers = data.customers;
      this.products = data.products;
      this.salesOrderHeader = data.salesOrderHeader;
      this.salesOrderDetails = this.salesOrderHeader.salesOrderDetails;
      console.log(this.salesOrder);
      this.salesOrderForm.setValue({
        SalesOrderHeaderID: this.salesOrderHeader.salesOrderHeaderID,
        PurchaseOrderNumber: this.salesOrderHeader.purchaseOrderNumber,
        Status: this.salesOrderHeader.status.toString(),
        OrderDate: datePipe.transform(this.salesOrderHeader.orderDate, 'yyyy-MM-dd'),
        OnlineOrderFlag: 's',
        SubTotal: this.salesOrderHeader.subTotal.toFixed(2).replace('.', ','),
        TaxAmt: this.salesOrderHeader.taxAmt.toFixed(2).replace('.', ','),
        Comment: this.salesOrderHeader.comment,
        CustomerID: this.salesOrderHeader.customerID
      });
      this.loading = false;
      //this.salesOrderForm.controls.SubTotal.disable();
      //this.salesOrderForm.controls.TaxAmt.disable();
    })
  }

  updateHeader(){
    if (this.salesOrderForm.controls['OnlineOrderFlag'].value === 's'){
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
    this.salesOrderService.putSalesOrderHeader(this.salesOrderID, this.salesOrderForm.value).subscribe((result)=>{
      this.salesOrderService.updateSalesOrderList();
      this.router.navigate(["/SalesOrder"]);
    })
  }
}
