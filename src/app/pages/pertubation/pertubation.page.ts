import { Component, Injector } from '@angular/core';

import { Pertubation } from '../../shared/models/event';
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

  async getData() {
    this.startRequest();

    const params = this.liaisonService.getCurrent();

    try {
      const events = await this.apiService.getEvent(params.from.name, params.to.name);
      this.eventsList = this.utils.getEventsList(events);
      this.currentEvents = this.eventsList.filter(el => el.status === 'en cours');
      this.upcomingEvents = this.eventsList.filter(el => el.status === 'prévisionnel');
    } catch (error) {
      this.handleError();
    }

    this.endRequest();
  }

}
