import { Injectable } from '@angular/core';
import { AppState, Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { PICTO_EVENTS } from '../models/constantesCD44';

import { ApiEvent, Pertubation } from '../models/event';
import { Bus, CurrentHoraire, DisplayBus, Horaire } from '../models/horaire';

const { App, Network } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * Hook to the networkStatusChange event
   */
  networkChangeDetector() {
    return new Observable(observer => {
      Network.addListener('networkStatusChange', status => {
        observer.next(status);
      });
    });
  }

  /**
   * Hook the appStateChange event
   */
  appStateChangeDetector() {
    return new Observable(observer => {
      App.addListener('appStateChange', (state: AppState) => {
        observer.next(state);
      });
    });
  }

  getEventsList(apiEvents?: ApiEvent[]): Pertubation[] {
    // TODO : Remplacer EVENT_MOCK par apiEvents
    return apiEvents.map(event => {
      return this.formatEvent(event);
    });
  }

  formatEvent(apiEvent: ApiEvent): Pertubation {
    let icon: string;
    let type: string;
    let datePublication: Date;

    icon = this.getIconEvent(apiEvent.type);
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

  formatBus(apiBus: Bus[]): DisplayBus[]{
    return apiBus.reduce( (acc, curr) => {
    const itemExists = acc.find( item => curr.ligne.numLigne === item.numeroBus && curr.sens === item.sens);
    if (itemExists) {
      itemExists.tempsList = [...itemExists.tempsList, curr.temps];
    } else {
      acc.push({numeroBus: curr.ligne.numLigne, sens: curr.sens, terminus: curr.terminus, tempsList: [curr.temps]});
    }
    return acc;
  }, []);
  }

  getIconEvent(type: string): string{
    let icon = 'particulier';
    const pictoEvent = PICTO_EVENTS.find(el => el.event === type);
    if (pictoEvent){
      icon = pictoEvent.picto;
    }
    return icon;
  }
}
