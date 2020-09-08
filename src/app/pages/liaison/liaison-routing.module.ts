import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiaisonPage } from './liaison.page';


const routes: Routes = [
  {
    path: '',
    component: LiaisonPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiaisonPageRoutingModule {}
