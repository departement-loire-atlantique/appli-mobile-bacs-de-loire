import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PertubationPageRoutingModule } from './pertubation-routing.module';

import { PertubationPage } from './pertubation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PertubationPageRoutingModule
  ],
  declarations: [PertubationPage]
})
export class PertubationPageModule {}
