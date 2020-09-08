import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
<<<<<<< HEAD

import { BackButtonComponent } from './components/back-button/back-button.component';
=======
import { IonicModule } from '@ionic/angular';
>>>>>>> 3ed34433c10bb5867ea238beff8cf0d619ece2fb

import { BackButtonComponent } from './components/back-button/back-button.component';
import { PushModalComponent } from './components/push-modal/push-modal.component';

@NgModule({
  declarations: [
<<<<<<< HEAD
    BackButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackButtonComponent
=======
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
>>>>>>> 3ed34433c10bb5867ea238beff8cf0d619ece2fb
  ]
})
export class SharedModule { }
