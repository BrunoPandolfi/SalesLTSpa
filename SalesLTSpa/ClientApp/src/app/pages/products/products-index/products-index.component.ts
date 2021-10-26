import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBoxes } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-products-index',
  templateUrl: './products-index.component.html',
  styleUrls: ['./products-index.component.css']
})
export class ProductsIndexComponent implements OnInit {

  products: any;
  faBoxes = faBoxes;

  constructor(
    public activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.updateProductsList().subscribe((productsList: any)=>{
      //console.log(products);
      this.products = productsList;
    });
  }

  createImgPath(serverPath){
    return `http://localhost:1168/${serverPath}`;
  }

  criarNovoProduto(){
    this.router.navigate(['Create'], {relativeTo: this.activatedRoute})
  }
}
