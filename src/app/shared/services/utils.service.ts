import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { EVENTS_BDL, KEYCHOICE } from '../models/constantesCD44';
import { ApiEvent, Pertubation } from '../models/event';
import { Liaison } from '../models/liaison';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute) { }

  getCurrentLiaison() {
    return this.activatedRoute.snapshot.firstChild.paramMap.get('id');
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
