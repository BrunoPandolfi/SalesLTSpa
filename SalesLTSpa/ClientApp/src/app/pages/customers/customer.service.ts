import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as data from '../../../assets/config.json';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly rootURL = data.default.api;
  customerList = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  getAllCustomers(){
    this.http.get(`${this.rootURL}/Customers`).subscribe((customers: any) =>{
      this.customerList.next(customers);
    });
  }

  updateCustomerList(){
    this.getAllCustomers();
    return this.customerList.asObservable();
  }

  getCustomerById(id){
    return this.http.get(`${this.rootURL}/Customers/${id}`);
  }

  postCustomer(newCustomer){
    return this.http.post(`${this.rootURL}/Customers`, newCustomer);
  }

  putCustomer(id, customer){
    return this.http.put(`${this.rootURL}/Customers/${id}`, customer);
  }
}
