import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resume-salesorder',
  templateUrl: './resume-salesorder.component.html',
  styleUrls: ['./resume-salesorder.component.css']
})
export class ResumeSalesorderComponent implements OnInit {
  @Input() show;
  @Input() salesOrderComplete;
  @Output() updateProductsItems = new EventEmitter();
  @Output() newSalesOrderComplete = new EventEmitter<any>();
  
  constructor(
    private Router: Router
  ) { }

  ngOnInit(): void {
    
  }

  calculateSubtotal(){
    var salesOrderDetails = this.salesOrderComplete.salesOrderDetails;
    var subTotal = 0;
    if (salesOrderDetails.length > 1){
      let teste = 0;
      subTotal = salesOrderDetails.reduce((prev, curr) =>{
        return prev + (curr.UnitPrice * curr.OrderQty) ;
      },0);
    }
    else{
      subTotal = salesOrderDetails[0].UnitPrice * salesOrderDetails[0].OrderQty
    }
    //console.log("Subtotal: " + subTotal);
    this.salesOrderComplete.salesOrderHeader.SubTotal = subTotal;
    console.log(this.salesOrderComplete);
    return subTotal;
  }

  calculateTaxAmt(){
    var subTotal = this.salesOrderComplete.salesOrderHeader.SubTotal;
    console.log(subTotal);
    let taxAmt = subTotal * 0.17;
    this.salesOrderComplete.salesOrderHeader.TaxAmt = taxAmt;
    //console.log(this.salesOrderComplete);
    return taxAmt; 
  }

  backToProductsSelection(){
    this.updateProductsItems.emit();
  }

  generateNewSalesOrder(){
    this.newSalesOrderComplete.emit(this.salesOrderComplete);
  }
}
