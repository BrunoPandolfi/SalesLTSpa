import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as data from "../../../assets/config.json";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly rootURL = data.default.api;
  productsList = new BehaviorSubject<any[]>([]);
  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  getAllProducts(){
    this.http.get(`${this.rootURL}/Products`).subscribe((products: any) =>{
      this.productsList.next(products);
    });
  }

  getProductById(id){
    return this.http.get(`${this.rootURL}/Products/${id}`);
  }

  updateProductsList(){
    this.getAllProducts();
    return this.productsList.asObservable();
  }

  postCustomer(newProduct){
    return this.http.post(`${this.rootURL}/Products`, newProduct);
  }

  putCustomer(id, product){
    return this.http.put(`${this.rootURL}/Products/${id}`, product);
  }
}
