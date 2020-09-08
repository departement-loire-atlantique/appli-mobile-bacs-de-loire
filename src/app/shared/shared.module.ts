import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { BackButtonComponent } from './components/back-button/back-button.component';
import { PushModalComponent } from './components/push-modal/push-modal.component';

@NgModule({
  declarations: [
    BackButtonComponent,
    PushModalComponent,
  ],
  entryComponents: [
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BackButtonComponent,
    PushModalComponent
  ]
})
export class SharedModule { }
