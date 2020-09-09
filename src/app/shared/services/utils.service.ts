import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { KEYCHOICE, EVENTS_BDL } from '../models/constantesCD44';
import { ApiEvent, Pertubation } from '../models/event';
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
      liaison.codeBus = 'LPBA';
    } else if (choix === 'le pellerin'){
      liaison.cameraOne = 'coueron1';
      liaison.cameraTwo = 'coueron2';
      liaison.from = 'Le Pellerin';
      liaison.to = 'Coueron';
      liaison.codeBus = 'CBAC';
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

  getTraficEventURL(from: string, to: string): string {
    const filter = encodeURI(`${from} - ${to}`);
    return environment.apiUrlEvent + filter;
  }

  getEventsList(apiEvents?: ApiEvent[]): Pertubation[]{
    // TODO : Remplacer EVENT_MOCK par apiEvents
    return EVENTS_BDL.map(event => {
      return this.formatEvent(event);
    });
  }

  formatEvent(apiEvent: ApiEvent): Pertubation {
    let icon: string;
    let type: string;
    let datePublication: Date;

    if (apiEvent.type === 'Incident') {
      icon = 'accident';
    } else if (apiEvent.type === 'Vent fort'){
      icon = 'vent-fort';
    } else {
      icon = 'particulier';
    }
    type = apiEvent.type;
    datePublication = new Date(apiEvent.datePublication.toString().split(' ')[0]);
    return {
      type,
      icon,
      datePublication,
      status: apiEvent.statut,
      ligne1: apiEvent.ligne1,
      ligne2: apiEvent.ligne2,
      ligne3: apiEvent.ligne3,
      ligne4: apiEvent.ligne4,
      ligne5: apiEvent.ligne5,
      ligne6: apiEvent.ligne6
    };
  }
}
