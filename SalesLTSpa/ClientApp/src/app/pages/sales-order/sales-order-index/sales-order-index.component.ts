import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBoxOpen, faPencilAlt, faPlus, faSearch, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SalesOrderService } from '../sales-order.service';

@Component({
  selector: 'app-sales-order-index',
  templateUrl: './sales-order-index.component.html',
  styleUrls: ['./sales-order-index.component.css']
})
export class SalesOrderIndexComponent implements OnInit {

  faSearch = faSearch;
  faPencilAlt = faPencilAlt;
  faPlus = faPlus;
  faTrash = faTrash;
  faBoxOpen = faBoxOpen;
  salesOrders: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    private salesOrderService: SalesOrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.salesOrderService.updateSalesOrderList().subscribe((data: any)=>{
      this.salesOrders = data;
    })
  }

  getStatusMessage (status)
  {
    return this.salesOrderService.getStatusMessage(status);
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
