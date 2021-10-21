import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sales-order-index',
  templateUrl: './sales-order-index.component.html',
  styleUrls: ['./sales-order-index.component.css']
})
export class SalesOrderIndexComponent implements OnInit {

  faSearch = faSearch;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  constructor() { }

  ngOnInit(): void {
  }

}
