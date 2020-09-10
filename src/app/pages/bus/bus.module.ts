import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';

import { BusPageRoutingModule } from './bus-routing.module';
import { BusPage } from './bus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusPageRoutingModule,
    SharedModule
  ],
  declarations: [BusPage]
})
export class BusPageModule { }
