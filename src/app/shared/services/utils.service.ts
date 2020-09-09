import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { EVENTS_BDL } from '../models/constantesCD44';
import { ApiEvent, Pertubation } from '../models/event';
import { CurrentHoraire, Horaire } from '../models/horaire';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private activatedRoute: ActivatedRoute) { }

  getCurrentLiaison() {
    return this.activatedRoute.snapshot.firstChild.paramMap.get('id');
  }

  getTraficEventURL(from: string, to: string): string {
    const url = environment.apiUrl + '/traficevents?filter=Bac%20de%20Loire%20' + encodeURI(`${from} - ${to}`);
    return  url;
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

  getCurrentHoraire(from: string, horaire: Horaire): CurrentHoraire {
    const currentHoraire: CurrentHoraire = new CurrentHoraire();
    if (from === 'Couëron' || from === 'Basse-Indre') {
         currentHoraire.firstDepart = horaire.from_first;
         currentHoraire.lastDepart = horaire.from_last;
     } else {
         currentHoraire.firstDepart = horaire.to_first;
         currentHoraire.lastDepart = horaire.to_last;
     }
    currentHoraire.period = horaire.from_period.charAt(0).toUpperCase() + horaire.from_period.slice(1);
    currentHoraire.message = horaire.from_message;
    return currentHoraire;
  }
}
