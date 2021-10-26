import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as data from '../../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  readonly rootURL = data.default.api;
  salesOrderList = new BehaviorSubject<any[]>([]);
  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  getAllSalesOrder(){
    this.http.get(`${this.rootURL}/SalesOrder`).subscribe((salesorder: any) =>{
      this.salesOrderList.next(salesorder);
    });
  }

  updateSalesOrderList(){
    this.getAllSalesOrder();
    return this.salesOrderList.asObservable();
  }

  getSalesOrderById(id){
    return this.http.get(`${this.rootURL}/SalesOrder/${id}`);
  }

  getSalesOrderForm(){
    return this.http.get(`${this.rootURL}/SalesOrder/Create`);
  }

  getSalesOrderEdit(id){
    return this.http.get(`${this.rootURL}/SalesOrder/Edit/${id}`);
  }

  postSalesOrder(newSalesOrder){
    return this.http.post(`${this.rootURL}/SalesOrder/Create`, newSalesOrder);
  }

  putSalesOrderHeader(id, newSalesOrderHeader){
    return this.http.put(`${this.rootURL}/SalesOrder/Edit/${id}`, newSalesOrderHeader);
  }

  deleteSalesOrder(id){
    return this.http.delete(`${this.rootURL}/SalesOrder/Delete/${id}`)
  }

  getColorStatus(status){
    return {
      "text-info" : status === 0,
      "text-warning" : status  === 1,
      "text-success" : status === 2
    }
  }

  getStatusMessage(status)
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

  getAllDiscounts(salesOrder){
    var salesOrderDetails = salesOrder.salesOrderDetails;
    var totalDiscount = 0;
    salesOrderDetails.map((obj)=>{
      totalDiscount += obj.unitPriceDiscount * obj.orderQty;
    });
    return totalDiscount;
  }

  calculateTaxAmt(subtotal){
    var taxAmt = subtotal * 0.17
    return taxAmt;
  }

  getTotalSalesOrder(salesOrder){
    return salesOrder.subTotal + salesOrder.taxAmt - this.getAllDiscounts(salesOrder);
  }
}
