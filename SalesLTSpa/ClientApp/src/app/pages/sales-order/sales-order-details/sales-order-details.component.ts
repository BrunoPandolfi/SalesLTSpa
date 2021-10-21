import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesOrderService } from '../../sales-order.service';
import * as data from  '../../../../assets/config.json';

@Component({
  selector: 'app-sales-order-details',
  templateUrl: './sales-order-details.component.html',
  styleUrls: ['./sales-order-details.component.css']
})
export class SalesOrderDetailsComponent implements OnInit {
  salesOrderID: any;
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
    this.salesOrderID = this.activatedRoute.snapshot.paramMap.get('id');
    this.salesOrderService.getSalesOrderById(this.salesOrderID).subscribe((data: any) =>{
      //console.log(data);
      this.salesOrder = data;
      this.loading = false;
    })
  }

  calculateTaxAmount(subtotal){
    this.taxAmount = subtotal * 0.17
    return this.taxAmount;
  }

  getThumbnailPhoto(imageURL){
    return `http://localhost:1168/${imageURL}`;
  }

  getTotalPriceItem (unitPrice, orderQty){
    console.log(orderQty);
    return unitPrice * orderQty;
  }

  hasDiscount(unitPriceDiscount)
  {
    return unitPriceDiscount > 0;
  }

  getTotalPriceWithDiscount(unitPrice, orderQty, unitPriceDiscount)
  {
    return (unitPrice * orderQty) - (unitPriceDiscount * orderQty);
  }

  getSubtotalSalesOrder(salesOrderDetails){
    this.subtotal = 0;
    salesOrderDetails.map((item) => {
      this.subtotal += this.getTotalPriceItem(item.unitPrice, item.orderQty);
    });
    return this.subtotal;
  }

  getAllDiscounts(salesOrderDetails){
    this.totalDiscounts = 0;
    salesOrderDetails.map((item) => {
      this.totalDiscounts += (item.unitPriceDiscount * item.orderQty);
    });
    return this.totalDiscounts;
  }
}
