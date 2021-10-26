import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesOrderService } from '../sales-order.service';
import * as data from '../../../../assets/config.json';

@Component({
  selector: 'app-sales-order-details',
  templateUrl: './sales-order-details.component.html',
  styleUrls: ['./sales-order-details.component.css']
})
export class SalesOrderDetailsComponent implements OnInit {
  //salesOrderID: any;
  salesOrder: any;
  loading: boolean;
  readonly rootURL = data.default.api;
  subtotal: number;
  totalDiscounts: number;
  taxAmount: number;
  totalOrder: number;

  constructor(
    public activatedRoute: ActivatedRoute,
    private salesOrderService: SalesOrderService,
    private router: Router
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.salesOrder = this.activatedRoute.snapshot.data['salesOrder'];
    console.log(this.salesOrder);
    this.loading = false;
  }

  getThumbnailPhoto(imageURL) {
    return `http://localhost:1168/${imageURL}`;
  }

  getTotalPriceItem(unitPrice, orderQty) {
    console.log(orderQty);
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

  getAllDiscounts(salesOrder) {
    return this.salesOrderService.getAllDiscounts(salesOrder)
  }
}
