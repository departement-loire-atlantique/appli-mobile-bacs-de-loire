import { Component, Injector } from '@angular/core';
import { Pertubation } from 'src/app/shared/models/event';
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

  constructor(
    private utilService: UtilsService,
    private apiService: ApiService,
    injector: Injector
  ) {
    super(injector);
  }

  ionViewWillEnter() {
    this.subscription = this.liaisonService.currentDirectionObserver.subscribe(() => {
      this.getData();
    });
  }

  async getData() {
    this.startRequest();

    const params = this.liaisonService.getCurrent();

    try {
      this.eventsList = await this.apiService.getEvent(params.from.name, params.to.name);
    } catch (error) {
      this.handleError();
    }

    this.eventsList = this.utilService.getEventsList();
    this.currentEvents = this.eventsList.filter(el => el.status === 'en cours');
    this.upcomingEvents = this.eventsList.filter(el => el.status === 'prévisionnel');

    this.endRequest();
  }

}
