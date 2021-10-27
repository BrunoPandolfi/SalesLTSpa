import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { SalesOrderService } from '../sales-order.service';

@Component({
  selector: 'app-delete-sales-order',
  templateUrl: './delete-sales-order.component.html',
  styleUrls: ['./delete-sales-order.component.css']
})
export class DeleteSalesOrderComponent implements OnInit {
  salesOrder: any;
  faTrashAlt = faTrashAlt;

  constructor(
    public activatedRoute: ActivatedRoute,
    private salesOrderService: SalesOrderService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.salesOrder = this.activatedRoute.snapshot.data['salesOrder'];
  }

  deleteSalesOrder(){
    var salesOrderID = this.salesOrder.salesOrderHeaderID;
    this.salesOrderService.deleteSalesOrder(salesOrderID).subscribe(()=>{
      this.salesOrderService.updateSalesOrderList();
      this.router.navigate(['/SalesOrder']);
      this.toastrService.warning('Pedido excluído do sistema', 'Completo');
    });
  }

  getStatusMessage(status){
    return this.salesOrderService.getStatusMessage(status);
  }
}
