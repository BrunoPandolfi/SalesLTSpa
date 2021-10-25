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

  getTextoStatus (status)
  {
    var texto = "";
    switch (status){
      case 0:
        texto = "Em elaboração";
        break;
      case 1: 
        texto = "Aguardando Pagamento";
        break;
      case 2: 
        texto = "Pagamento efetuado";
    }
    return texto;
  }

  getTotalSalerOrder(){

  }

  getAllDiscounts(salesOrder){
    var salesOrderDetails = salesOrder.salesOrderDetails;
    var totalDiscount = 0;
    salesOrderDetails.map((obj)=>{
      totalDiscount += obj.unitPriceDiscount * obj.orderQty;
    });
    return totalDiscount;
  }

  aplicarCorTextoStatus(status)
  {
    return {
      "text-info" : status === 0,
      "text-warning" : status  === 1,
      "text-success" : status === 2
    }
  }

  criarNovoPedido(){
    this.router.navigate(['Create'], {relativeTo: this.activatedRoute});
  }
}
