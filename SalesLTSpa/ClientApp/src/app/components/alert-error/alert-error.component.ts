import { Component, Input, OnInit } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.css']
})
export class AlertErrorComponent implements OnInit {

  faExclamation = faExclamationTriangle;
  @Input() message;
  @Input() show;

  constructor() { }

  ngOnInit(): void {
  }

}
