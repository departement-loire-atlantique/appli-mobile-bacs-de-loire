import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { LiaisonPageRoutingModule } from './liaison-routing.module';
import { LiaisonPage } from './liaison.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiaisonPageRoutingModule,
    SharedModule
  ],
  declarations: [
    LiaisonPage
  ]
})
export class LiaisonPageModule { }
