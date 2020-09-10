import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';

import { HorairePageRoutingModule } from './horaire-routing.module';
import { HorairePage } from './horaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorairePageRoutingModule,
    SharedModule
  ],
  declarations: [HorairePage]
})
export class HorairePageModule { }
