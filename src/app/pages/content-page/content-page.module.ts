import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';

import { ContentPagePageRoutingModule } from './content-page-routing.module';
import { ContentPagePage } from './content-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentPagePageRoutingModule,
    SharedModule
  ],
  declarations: [ContentPagePage]
})
export class ContentPagePageModule { }
