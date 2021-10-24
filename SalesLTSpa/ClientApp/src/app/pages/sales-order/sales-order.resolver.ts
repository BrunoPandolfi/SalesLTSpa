import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SalesOrderService } from './sales-order.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderResolver implements Resolve<any> {
  constructor(private salesOrderService: SalesOrderService, private router: Router){

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const salesOrderHeaderID = route.params.id;
    if (Number.isNaN(salesOrderHeaderID))
    {
      return of(null);
    }
  
    return this.salesOrderService.getSalesOrderById(salesOrderHeaderID)
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
