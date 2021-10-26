import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faMinusCircle, faPlus, faPlusCircle, faPray } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddDiscountComponent } from '../add-discount/add-discount.component';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  @Input() show;
  @Input() products;
  @Output() newSalesOrderDetails = new EventEmitter<any[]>();
  @Output() ToSalesHeader = new EventEmitter();
  salesOrderDetails: any[] = [];
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faPlus = faPlus;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  sendSalesOrderDetails(){
    if (this.salesOrderDetails.length > 0)
    {
      this.newSalesOrderDetails.emit(this.salesOrderDetails);
    }
  }
  
  removeProductItem(index, product)
  {
    var indexProduct = this.products.findIndex((obj => obj.name === product.name))
    this.products[indexProduct].OrderQty = 1;
    this.products[indexProduct].Added = false;
    this.salesOrderDetails.splice(index, 1);
  }

  getImageServer(imgPath){
    return `http://localhost:1168/${imgPath}`;
  }

  addQty (product){
    product.OrderQty += 1;
  }

  subQty (product){
    if (product.OrderQty > 1)
    {
      product.OrderQty -= 1;
    }
  }

  addDiscountToProduct(product){
    this.modalRef = this.modalService.show(AddDiscountComponent, {class: 'modal-lg', initialState: {product: product}});
    this.modalRef.content.newDiscountPrice.subscribe(res =>{
      this.createSalesOrderDetail(product, res);
      this.modalRef.hide();
    });
    //this.modalRef.content.product = product;
  }
  

  createSalesOrderDetail(product, unitPriceDiscount){
    if(product.OrderQty === 0)
    {
      return;
    }
    var orderQty = product.OrderQty;
    var chooseProduct = product;
    delete chooseProduct['Added'];
    delete chooseProduct['OrderQty'];

    this.salesOrderDetails.push({
      "OrderQty": orderQty,
      "UnitPrice": chooseProduct.listPrice,
      "UnitPriceDiscount": unitPriceDiscount,
      "ProductID": chooseProduct.productID,
      "Product": chooseProduct
    });
    product["Added"] = true;
    console.log(this.salesOrderDetails);
  }

  backToSalesHeader(){
    console.log("teste")
    this.ToSalesHeader.emit();
  }

}
