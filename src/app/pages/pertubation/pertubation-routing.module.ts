import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PertubationPage } from './pertubation.page';

const routes: Routes = [
  {
    path: '',
    component: PertubationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PertubationPageRoutingModule {}
