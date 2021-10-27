import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  faMinusSquare = faMinusSquare;
  product: any;
  imgName: string;
  imgSrc: any;
  error: boolean;
  message: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toastrService: ToastrService
  ) { 
    this.error = false;
  }

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
      this.toastrService.warning('Produto foi excluído do sistema!!', 'Completo');
    },
    erro =>{
      this.message = erro.error;
      this.error = true;
    });
  }

}
