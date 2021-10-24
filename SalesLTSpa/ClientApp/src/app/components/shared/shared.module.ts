import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ErrorPageComponent } from 'src/app/pages/error-page/error-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [    
    ErrorMessageComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule, 
    RouterModule
  ],
  exports: [
    ErrorMessageComponent,
    ErrorPageComponent
  ]
})
export class SharedModule { }
