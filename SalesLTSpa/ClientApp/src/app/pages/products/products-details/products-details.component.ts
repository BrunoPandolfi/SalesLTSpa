import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  product: any;
  imgSrc: string;
  imgName: string;
  loading: boolean;

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    this.imgSrc = `http://localhost:1168/${this.product.thumbnailPhoto}`;
    this.imgName = this.product.thumbnailPhotoName;
    setTimeout(()=>{
      this.loading = false;
    }, 2000);
  }

}
