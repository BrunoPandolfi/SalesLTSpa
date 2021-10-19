import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly rootURL = 'http://localhost:1168/api';

  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  getAllCustomers(){
    return this.http.get(this.rootURL + '/Customers');
  }
}
