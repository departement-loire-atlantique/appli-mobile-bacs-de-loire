import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { BackButtonComponent } from './components/back-button/back-button.component';
import { PertubationsComponent } from './components/pertubations/pertubations.component';
import { PushModalComponent } from './components/push-modal/push-modal.component';
import { RequestFeedbackComponent } from './components/request-feedback/request-feedback.component';

@NgModule({
  declarations: [
    BackButtonComponent,
    PertubationsComponent,
    PushModalComponent,
    RequestFeedbackComponent
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
    PertubationsComponent,
    RequestFeedbackComponent
  ]
})
export class SharedModule { }
