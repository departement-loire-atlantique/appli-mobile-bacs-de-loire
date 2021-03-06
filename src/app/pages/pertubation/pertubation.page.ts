import { Component, Injector } from '@angular/core';
import { langFr, EVENTS_BDL } from 'src/app/shared/models/constantesCD44';
import { ApiEvent, Pertubation } from 'src/app/shared/models/event';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';


import { AbstractPage } from '../abstract';

@Component({
  selector: 'app-pertubation',
  templateUrl: './pertubation.page.html',
  styleUrls: ['./pertubation.page.scss'],
})
export class PertubationPage extends AbstractPage {

  public currentEvents: Pertubation[];
  public upcomingEvents: Pertubation[];
  public eventsList: Pertubation[];

  constructor(injector: Injector) {
    super(injector);
  }

  async getData(event?: any) {
    this.startRequest();

    const params = this.liaisonService.getCurrent();

    try {
      let from: string;
      let to: string;
      if (params.codeHoraire === 'liaison1') {
        from = langFr.COUERON; to = langFr.LEPELLERIN;
      } else if (params.codeHoraire === 'liaison2') {
        from = langFr.BASSEINDRE, to = langFr.INDRET;
      }
      const apiEvents = await this.apiService.getEvent(from, to);
      this.eventsList = this.utils.getEventsList(apiEvents);
      // TODO Mock to show pertubation. Delete for PROD
      // this.eventsList = this.utils.getEventsList(EVENTS_BDL);
      this.currentEvents = this.eventsList.filter(el => el.status === 'en cours');
      this.upcomingEvents = this.eventsList.filter(el => el.status === 'prévisionnel');
    } catch (error) {
      this.handleError();
    }
    if (event) {
      event.target.complete();
    }
    this.endRequest();
  }

}
