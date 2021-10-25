import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
import { CustomerService } from '../../customers/customer.service';
import { SalesOrderService } from '../sales-order.service';

@Component({
  selector: 'app-edit-sales-order',
  templateUrl: './edit-sales-order.component.html',
  styleUrls: ['./edit-sales-order.component.css']
})
export class EditSalesOrderComponent implements OnInit {
  loading: boolean;
  salesOrder: any;
  salesOrderComplete: any;
  salesOrderForm: FormGroup;
  customers: any;
  products: any;
  salesOrderHeader: any;
  salesOrderDetails: any;
  imgSrc: any;
  subtotal: any;
  totalDiscounts: any;
  taxAmount: any;

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
    this.salesOrder = this.activatedRoute.snapshot.data['salesOrder'];

    this.salesOrderForm = this.formBuilder.group({
      SalesOrderHeaderID: [null],
      PurchaseOrderNumber: [null],
      Status: [null],
      OrderDate: [null, [Validators.required]],
      OnlineOrderFlag: ['n'],
      SubTotal: [null],
      TaxAmt: [null],
      Comment: [null, [Validators.required]],
      CustomerID: [null]
    });

    this.salesOrderDetails = this.salesOrder.salesOrderDetails;

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

  getThumbnailPhoto(imgSrc) {
    return `http://localhost:1168/${imgSrc}`;
  }

  getTotalPriceItem(unitPrice, orderQty) {
    return unitPrice * orderQty;
  }

  hasDiscount(unitPriceDiscount) {
    return unitPriceDiscount > 0;
  }

  getTotalPriceWithDiscount(unitPrice, orderQty, unitPriceDiscount) {
    return (unitPrice * orderQty) - (unitPriceDiscount * orderQty);
  }

  getSubtotalSalesOrder(salesOrderDetails) {
    this.subtotal = 0;
    salesOrderDetails.map((item) => {
      this.subtotal += this.getTotalPriceItem(item.unitPrice, item.orderQty);
    });
    return this.subtotal;
  }

  getAllDiscounts(salesOrderDetails) {
    this.totalDiscounts = 0;
    salesOrderDetails.map((item) => {
      this.totalDiscounts += (item.unitPriceDiscount * item.orderQty);
    });
    return this.totalDiscounts;
  }

  calculateTaxAmount(subtotal) {
    this.taxAmount = subtotal * 0.17
    return this.taxAmount;
  }

  removeSalesDetail(index, salesDetail) {
    if (this.salesOrderDetails.length > 1) 
    {
      var indexSalesDetail = this.salesOrderDetails.findIndex((obj => obj.salesOrderDetailID === salesDetail.salesOrderDetailID));
      this.salesOrderDetails.splice(indexSalesDetail, 1);
      this.updateSubtotal();
      this.updateTaxAmt();
    }
    else{
      console.log("Não é possível remover o item da lista porque ele é o único");
    }

  }

  updateSubtotal() {
    var salesOrderDetails = this.salesOrderDetails;
    var subTotal = 0;
    if (salesOrderDetails.length > 1) {
      subTotal = salesOrderDetails.reduce((prev, curr) => {
        return prev + (curr.UnitPrice * curr.OrderQty);
      }, 0);
    }
    else {
      subTotal = salesOrderDetails[0].UnitPrice * salesOrderDetails[0].OrderQty
    }
    //console.log("Subtotal: " + subTotal);
    this.salesOrder.SubTotal = subTotal;
    console.log(this.salesOrder);
    return subTotal;
  }

  updateTaxAmt() {
    var subTotal = this.salesOrder.subTotal;
    //console.log(subTotal);
    let taxAmt = subTotal * 0.17;
    this.salesOrder.taxAmt = taxAmt;
    //console.log(this.salesOrderComplete);
    return taxAmt;
  }

  updateSalesOrder() {
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
        SubTotal: this.salesOrder.subTotal,
        TaxAmt: this.salesOrder.taxAmt
      });

      this.salesOrderComplete = this.salesOrderForm.value;
      this.salesOrderComplete['SalesOrderDetails'] = this.salesOrderDetails;
      //console.log(this.salesOrderComplete);
      const salesOrderID = this.salesOrderComplete.SalesOrderHeaderID;

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
      case 'Comment':
        name = "Comentário";
        break;
    }
    return name;
  }

}
