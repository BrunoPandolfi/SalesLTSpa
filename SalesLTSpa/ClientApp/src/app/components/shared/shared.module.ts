import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ErrorPageComponent } from 'src/app/pages/error-page/error-page.component';



@NgModule({
  declarations: [    
    ErrorMessageComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorMessageComponent,
    ErrorPageComponent
  ]
})
export class SharedModule { }
