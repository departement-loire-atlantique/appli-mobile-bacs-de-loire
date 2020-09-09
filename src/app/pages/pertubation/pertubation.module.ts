import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { PertubationPageRoutingModule } from './pertubation-routing.module';
import { PertubationPage } from './pertubation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PertubationPageRoutingModule,
  ],
  declarations: [PertubationPage]
})
export class PertubationPageModule {}
