import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesOrderService } from '../sales-order.service';

@Component({
  selector: 'app-delete-sales-order',
  templateUrl: './delete-sales-order.component.html',
  styleUrls: ['./delete-sales-order.component.css']
})
export class DeleteSalesOrderComponent implements OnInit {
  salesOrderId: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    private salesOrderService: SalesOrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.salesOrderId = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
