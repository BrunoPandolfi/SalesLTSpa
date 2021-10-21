import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as data from "../../assets/config.json";

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
}
