import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  faClipboard = faClipboard;
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
    this.loading = false;
  }

}
