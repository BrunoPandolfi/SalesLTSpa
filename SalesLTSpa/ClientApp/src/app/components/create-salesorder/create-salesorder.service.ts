import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateSalesorderService {

 products = new BehaviorSubject<any[]>([]);

  constructor() { }
}
