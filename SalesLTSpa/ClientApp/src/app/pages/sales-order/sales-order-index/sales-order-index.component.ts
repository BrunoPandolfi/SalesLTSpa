import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPencilAlt, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SalesOrderService } from '../sales-order.service';

@Component({
  selector: 'app-sales-order-index',
  templateUrl: './sales-order-index.component.html',
  styleUrls: ['./sales-order-index.component.css']
})
export class SalesOrderIndexComponent implements OnInit {

  faSearch = faSearch;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  salesOrders: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    private salesOrderService: SalesOrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.salesOrderService.updateSalesOrderList().subscribe((data: any)=>{
      console.log(data);
      this.salesOrders = data;
    })
  }

  getStatusMessage (status)
  {
    this.salesOrderService.getStatusMessage(status);
  }

  getAllDiscounts(salesOrder){
    return this.salesOrderService.getAllDiscounts(salesOrder);
  }

  setColorStatus(status)
  {
    return this.salesOrderService.getColorStatus(status);
  }

  criarNovoPedido(){
    this.router.navigate(['Create'], {relativeTo: this.activatedRoute});
  }
}
