import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { BackButtonComponent } from './components/back-button/back-button.component';
import { PertubationsComponent } from './components/pertubations/pertubations.component';
import { PushModalComponent } from './components/push-modal/push-modal.component';



@NgModule({
  declarations: [
    BackButtonComponent,
    PertubationsComponent,
    PushModalComponent
  ],
  providers: [],
  entryComponents: [
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BackButtonComponent,
    PushModalComponent,
    PertubationsComponent
  ]
})
export class SharedModule { }
