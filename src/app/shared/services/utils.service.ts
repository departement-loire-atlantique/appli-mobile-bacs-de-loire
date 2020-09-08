import { Injectable } from '@angular/core';

import { KEYCHOICE } from '../models/constantesCD44';
import { Liaison } from '../models/liaison';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private storageService: StorageService) { }

  formatChoixQuai(choix: string): Liaison {
    console.log('choix ', choix);
    const liaison = new Liaison();
    if (choix === 'coueron' || choix === 'perturbation-c-lp'){
      liaison.cameraOne = 'coueron1';
      liaison.cameraTwo = 'coueron2';
      liaison.from = 'Coueron';
      liaison.to = 'Le Pellerin';
      liaison.codeBus = 'CBAC';
    } else if (choix === 'le pellerin'){
      liaison.cameraOne = 'coueron1';
      liaison.cameraTwo = 'coueron2';
      liaison.from = 'Le Pellerin';
      liaison.to = 'Coueron';
      liaison.codeBus = 'LPBA';
    } else if (choix === 'basse indre' || choix === 'perturbation-bi-i'){
      liaison.cameraOne = 'indre1';
      liaison.cameraTwo = 'indre2';
      liaison.from = 'Basse-Indre';
      liaison.to = 'Indret';
      liaison.codeBus = 'BIND';
    } else if (choix === 'indret'){
      liaison.cameraOne = 'indre1';
      liaison.cameraTwo = 'indre2';
      liaison.from = 'Indret';
      liaison.to = 'Basse-Indre';
      liaison.codeBus = 'BIND';
    }
    return liaison;
  }

  async saveChoixQuai(liaison: Liaison){
    await this.storageService.set(KEYCHOICE, liaison);
  }
}
