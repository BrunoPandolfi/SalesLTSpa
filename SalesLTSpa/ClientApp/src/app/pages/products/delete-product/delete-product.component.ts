import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  product: any;
  imgName: string;
  imgSrc: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    this.imgName = this.product.thumbnailPhotoName;
    this.imgSrc = `http://localhost:1168/${this.product.thumbnailPhoto}`;
  }

  deleteProduct(){
    var productID = this.product.productID;
    this.productService.deleteCustomer(productID).subscribe(()=>{
      this.productService.updateProductsList();
      this.router.navigate(['/Products']);
    },
    error =>{
      console.log(error);
    });
  }

}
