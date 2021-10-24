import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../../../assets/Product';

@Component({
  selector: 'app-form-data-product',
  templateUrl: './form-data-product.component.html',
  styleUrls: ['./form-data-product.component.css']
})
export class FormDataProductComponent implements OnInit {

  product: any;
  formProduct: FormGroup;
  imgSrc: any;


  constructor(
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    const pipe = new DatePipe('en-US');

    this.formProduct = this.formBuilder.group({
      ProductID: [0],
      Name: [null, [Validators.required]],
      ProductNumber: [null, [Validators.required]],
      Color: [null, [Validators.required]],
      StandardCost: [null, [Validators.required]],
      ListPrice: [null, [Validators.required]],
      DiscontinuedDate: [null, [Validators.required]],
      ThumbnailPhoto: [null],
      ThumbnailPhotoName: [null]
    });
    if (this.product !== undefined) {
         this.formProduct.setValue({
          ProductID: this.product.productID,
          Name: this.product.name,
          ProductNumber: this.product.productNumber,
          Color: this.product.color,
          StandardCost: this.product.standardCost.toFixed(2),
          ListPrice: this.product.listPrice.toFixed(2),
          DiscontinuedDate: pipe.transform(this.product.discontinuedDate, 'yyyy-MM-dd'),
          ThumbnailPhoto: null,
          ThumbnailPhotoName: this.product.thumbnailPhotoName
        });
        this.imgSrc = `http://localhost:1168/${this.product.thumbnailPhoto}`;
    }
    else {
      this.imgSrc = `http://localhost:1168/Images/notfound.jpg`;
      return;
    }

  }

  postProduct() {
    if (this.formProduct.valid) {
      this.formProduct.controls['StandardCost'].setValue(
        this.changeCommaToPointer(this.formProduct.controls['StandardCost'].value)
      );
      this.formProduct.controls['ListPrice'].setValue(
        this.changeCommaToPointer(this.formProduct.controls['ListPrice'].value)
      );
      this.productService.postCustomer(this.formProduct.value).subscribe(() => {
        this.productService.updateProductsList();
        this.router.navigate(['/Products']);
      });
    }
    else {
      console.log(this.formProduct);
      Object.keys(this.formProduct.controls).forEach(field => {
        const control = this.formProduct.get(field);
        control?.markAsDirty();
        if (control instanceof FormGroup) {
          this.isValid(control);
        }
      })
    }
  }

  putProduct() {
    if(this.formProduct.valid){
      const productID = this.product.productID;
      this.formProduct.controls['StandardCost'].setValue(
        this.changeCommaToPointer(this.formProduct.controls['StandardCost'].value)
      );
      this.formProduct.controls['ListPrice'].setValue(
        this.changeCommaToPointer(this.formProduct.controls['ListPrice'].value)
      );
      this.productService.putCustomer(productID, this.formProduct.value).subscribe(() => {
        this.productService.updateProductsList();
        this.router.navigate(['/Products']);
      });
    }
    else{
      Object.keys(this.formProduct.controls).forEach(field => {
        const control = this.formProduct.get(field);
        control?.markAsDirty();
        if (control instanceof FormGroup) {
          this.isValid(control);
        }
      });
    }
  }

  alterarImgUpload(event) {
    const reader = new FileReader();
    const [file] = event.target.files;
    this.formProduct.controls['ThumbnailPhotoName'].setValue(file.name);
    reader.readAsDataURL(file);
    console.log(file);
    reader.onload = () => {
      this.imgSrc = reader.result as string;
      this.formProduct.controls['ThumbnailPhoto'].setValue(file ? reader.result : '', { emitModelToViewChange: false });
    }
  }

  isValid(fieldName) {
    var field = this.formProduct.controls[fieldName];
    return !field.valid && (field.touched || field.dirty);
  }

  getFieldName(field) {
    var name = "";
    switch (field) {
      case 'Name':
        name = "Nome";
        break;
      case 'ProductNumber':
        name = 'Código do produto';
        break;
      case 'Color':
        name = 'Cor do produto';
        break;
      case 'StandardCost':
        name = 'Custo de produção';
        break;
      case 'ListPrice':
        name = 'Preço de venda';
        break;
      case 'DiscontinuedDate':
        name = 'Preço de venda';
        break;
    }
    return name;
  }

  voltarIndex() {
    this.router.navigate(["/Products"]);
  }

  changeCommaToPointer(valueDouble) {
    let value = valueDouble.replace(/,/g, '.');
    return value;
  }


}
