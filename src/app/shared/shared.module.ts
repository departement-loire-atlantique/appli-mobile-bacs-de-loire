import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BackButtonComponent } from './components/back-button/back-button.component';



@NgModule({
  declarations: [
    BackButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackButtonComponent
  ]
})
export class SharedModule { }
