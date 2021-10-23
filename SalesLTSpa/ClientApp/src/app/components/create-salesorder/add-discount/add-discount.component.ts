import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {

  @Input() product;
  UnitPriceDiscount: number = 0.00;
  @Output() newDiscountPrice = new EventEmitter<any>();

  constructor(
    public bsModalRef: BsModalRef
  ) { 

  }

  ngOnInit(): void {
  }

  updateDiscountPrice(event){
    let discPrct = event.target.value / 100;
    this.UnitPriceDiscount = this.product.listPrice * discPrct;
  }

  addProductWithDiscount(){
    this.newDiscountPrice.emit(this.UnitPriceDiscount);
  }

}
