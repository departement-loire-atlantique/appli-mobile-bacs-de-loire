import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { BackButtonComponent } from './components/back-button/back-button.component';
import { PertubationsComponent } from './components/pertubations/pertubations.component';
import { PushModalComponent } from './components/push-modal/push-modal.component';
import { RequestFeedbackComponent } from './components/request-feedback/request-feedback.component';
import { SvgBacsComponent } from './components/svg-bacs/svg-bacs.component';



@NgModule({
  declarations: [
    BackButtonComponent,
    PertubationsComponent,
    PushModalComponent,
    RequestFeedbackComponent,
    SvgBacsComponent
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
    RequestFeedbackComponent,
    SvgBacsComponent
  ]
})
export class SharedModule { }
