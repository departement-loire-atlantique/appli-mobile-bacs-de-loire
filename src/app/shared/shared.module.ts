import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { BackButtonComponent } from './components/back-button/back-button.component';
import { PertubationsComponent } from './components/pertubations/pertubations.component';




@NgModule({
  declarations: [
    BackButtonComponent,
    PertubationsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BackButtonComponent,
    PertubationsComponent,
  ],
  providers: []
})
export class SharedModule { }
