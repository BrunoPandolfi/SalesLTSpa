import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ErrorPageComponent } from 'src/app/pages/error-page/error-page.component';
import { RouterModule } from '@angular/router';
import { AlertErrorComponent } from '../alert-error/alert-error.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [    
    ErrorMessageComponent,
    ErrorPageComponent,
    AlertErrorComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    ErrorMessageComponent,
    ErrorPageComponent,
    AlertErrorComponent
  ]
})
export class SharedModule { }
