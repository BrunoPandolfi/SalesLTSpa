import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersResolver implements Resolve<any> {
  constructor(private customerService: CustomerService, private router: Router){

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const customerID = route.params.id;
    if (isNaN(+customerID))
    {
      return of(null);
    }
  
    return this.customerService.getCustomerById(customerID)
      .pipe(
        map(result => {
          if (result){
            return result;
          }
          else{
            this.router.navigate(['/404']);
            return of(null);
          }
        }), 
        catchError(()=>{
          this.router.navigate(['/404']);
            return of(null);
        })
      );
  }
}
