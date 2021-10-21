import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  productID: any;
  product: any;
  imgSrc: string;
  imgName: string;
  loading: boolean;

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { 
    this.loading = true;
  }

  ngOnInit(): void {
    this.productID = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(this.productID).subscribe((result)=>{
      this.product = result;
      console.log(this.product.thumbnailPhotoName)
      this.imgSrc = `http://localhost:1168/${this.product.thumbnailPhoto}`;
      this.imgName = this.product.thumbnailPhotoName;
      this.loading = false;
    });
  }

}
