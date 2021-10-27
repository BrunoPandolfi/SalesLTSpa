import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<any> {
  constructor(private productService: ProductService, private router: Router){

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const productID = route.params.id;
    if (Number.isNaN(productID))
    {
      return of(null);
    }
  
    return this.productService.getProductById(productID)
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
