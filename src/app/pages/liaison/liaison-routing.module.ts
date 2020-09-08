import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LiaisonPage } from './liaison.page';


const routes: Routes = [
  {
    path: '',
    component: LiaisonPage,
    children: [
      {
        path: '',
        redirectTo: 'perturbation',
        pathMatch: 'full',
      },
      {
        path: 'perturbation',
        loadChildren: () => import('../pertubation/pertubation.module').then(m => m.PertubationPageModule)
      },
      {
        path: 'bus',
        loadChildren: () => import('../bus/bus.module').then(m => m.BusPageModule)
      },
      {
        path: 'camera',
        loadChildren: () => import('../camera/camera.module').then(m => m.CameraPageModule)
      },
      {
        path: 'horaire',
        loadChildren: () => import('../horaire/horaire.module').then(m => m.HorairePageModule)
      },
      {
        path: 'localisation',
        loadChildren: () => import('../localisation/localisation.module').then(m => m.LocalisationPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiaisonPageRoutingModule { }
