import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiaisonPage } from './liaison.page';
import { PertubationPage } from '../pertubation/pertubation.page';


const routes: Routes = [
  {
    path: '',
    component: LiaisonPage,
    redirectTo: 'pertubation',
    children: [
        {
          path: 'pertubation',
          loadChildren: () => import('../pertubation/pertubation.page').then(m => m.PertubationPage)
        },
        {
          path: 'horaire',
          loadChildren: () => import('../horaire/horaire.page').then(m => m.HorairePage)
        },
        {
          path: 'pertubation',
          loadChildren: () => import('../camera/camera.page').then(m => m.CameraPage)
        },
        {
          path: 'pertubation',
          loadChildren: () => import('../localisation/localisation.page').then(m => m.LocalisationPage)
        },
        {
          path: 'pertubation',
          loadChildren: () => import('../bus/bus.page').then(m => m.BusPage)
        },
        {
          path: '',
          redirectTo: 'pertubation'
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiaisonPageRoutingModule {}
