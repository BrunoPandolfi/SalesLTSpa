import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesOrderService } from '../sales-order.service';

@Component({
  selector: 'app-delete-sales-order',
  templateUrl: './delete-sales-order.component.html',
  styleUrls: ['./delete-sales-order.component.css']
})
export class DeleteSalesOrderComponent implements OnInit {
  salesOrder: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    private salesOrderService: SalesOrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //this.salesOrderId = this.activatedRoute.snapshot.paramMap.get('id');
    this.salesOrder = this.activatedRoute.snapshot.data['salesOrder'];
    console.log(this.salesOrder);
  }

  deleteSalesOrder(){
    var salesOrderID = this.salesOrder.salesOrderHeaderID;
    this.salesOrderService.deleteSalesOrder(salesOrderID).subscribe(()=>{
      this.salesOrderService.updateSalesOrderList();
      this.router.navigate(['/SalesOrder']);
    },
    error =>{
      console.log(error);
    });
  }

}
