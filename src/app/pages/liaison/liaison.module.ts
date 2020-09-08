import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiaisonPageRoutingModule } from './liaison-routing.module';

import { LiaisonPage } from './liaison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiaisonPageRoutingModule
  ],
  declarations: [LiaisonPage]
})
export class LiaisonPageModule {}
