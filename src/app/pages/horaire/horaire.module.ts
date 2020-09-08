import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HorairePageRoutingModule } from './horaire-routing.module';
import { HorairePage } from './horaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorairePageRoutingModule
  ],
  declarations: [HorairePage]
})
export class HorairePageModule {}
