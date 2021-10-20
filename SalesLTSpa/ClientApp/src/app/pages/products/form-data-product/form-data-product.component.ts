import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../../../assets/Product';

@Component({
  selector: 'app-form-data-product',
  templateUrl: './form-data-product.component.html',
  styleUrls: ['./form-data-product.component.css']
})
export class FormDataProductComponent implements OnInit {

  productID: any;
  formProduct: FormGroup;
  imgSrc: any;


  constructor(
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router, 
    private productService: ProductService, 
    private currencyPipe : CurrencyPipe
  ) { 
    this.currencyPipe = new CurrencyPipe('pt-BR');
  }

  ngOnInit(): void {
    this.productID = this.activatedRoute.snapshot.paramMap.get('id');
    //var customer = {};
    const pipe = new DatePipe('en-US');
    const reader = new FileReader();
    
    
    this.formProduct = this.formBuilder.group({
      Name: [null],
      ProductNumber: [null],
      Color: [null],
      StandardCost: [null],
      ListPrice: [null],
      DiscontinuedDate: [null],
      ThumbnailPhoto: [null],
      ThumbnailPhotoName: [null]
    });
    if (this.productID)
    {
      this.productService.getProductById(this.productID).subscribe((product : any) =>{
        this.formProduct = this.formBuilder.group({
          ProductID: [product.productID],
          Name: [product.name],
          ProductNumber: [product.productNumber],
          Color: [product.color],
          StandardCost: [product.standardCost.toFixed(2)],
          ListPrice: [product.listPrice.toFixed(2)],
          DiscontinuedDate: [pipe.transform(product.discontinuedDate, 'yyyy-MM-dd')],
          ThumbnailPhoto: [null],
          ThumbnailPhotoName: [product.thumbnailPhotoName]
        });
        this.imgSrc = `http://localhost:1168/${product.thumbnailPhoto}`;        
      });
    }
    else{
      this.imgSrc = `http://localhost:1168/Images/notfound.jpg`;
      return;
      
    }
    
  }

  postProduct(){
    this.formProduct.controls['StandardCost'].setValue(
      this.changeCommaToPointer(this.formProduct.controls['StandardCost'].value)
    );
    this.formProduct.controls['ListPrice'].setValue(
      this.changeCommaToPointer(this.formProduct.controls['ListPrice'].value)
    );
    console.log(this.formProduct.value);
    this.productService.postCustomer(this.formProduct.value).subscribe(()=>{
      this.productService.updateProductsList();
      this.router.navigate(['/Products']);
    });
  }

  putProduct(){
    this.formProduct.controls['StandardCost'].setValue(
      this.changeCommaToPointer(this.formProduct.controls['StandardCost'].value)
    );
    this.formProduct.controls['ListPrice'].setValue(
      this.changeCommaToPointer(this.formProduct.controls['ListPrice'].value)
    );
    this.productService.putCustomer(this.productID, this.formProduct.value).subscribe(()=>{
      this.productService.updateProductsList();
      this.router.navigate(['/Products']);
    });
  }

  alterarImgUpload(event){
    const reader = new FileReader();
    const [file] = event.target.files;
    this.formProduct.controls['ThumbnailPhotoName'].setValue(file.name);
    reader.readAsDataURL(file);
    console.log(file);
    reader.onload = () => {
      this.imgSrc = reader.result as string;
      this.formProduct.controls['ThumbnailPhoto'].setValue(file ? reader.result : '', {emitModelToViewChange: false});
    }
  }

  voltarIndex(){
    this.router.navigate(["/Products"]);
  }

  changeCommaToPointer(valueDouble){
    let value = valueDouble.replace(/,/g, '.');
    return value;
  }
}