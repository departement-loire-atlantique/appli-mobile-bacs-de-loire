import { Component } from '@angular/core';
import { Pertubation } from 'src/app/shared/models/event';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { LiaisonService } from '../../shared/services/liaison.service';
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
    private liaisonService: LiaisonService
  ) {
    super();
  }

  ionViewWillEnter() {
    this.subscription = this.liaisonService.currentDirectionObserver.subscribe(() => {
      this.getData();
    });
  }

  async getData() {
    const params = this.liaisonService.getCurrent();
    this.eventsList = await this.apiService.getEvent(params.from, params.to);
    console.log('this.eventsList from API ', this.eventsList);

    this.eventsList = this.utilService.getEventsList();
    console.log('this.eventsList ', this.eventsList);
    this.currentEvents = this.eventsList.filter(el => el.status === 'en cours');
    this.upcomingEvents = this.eventsList.filter(el => el.status === 'prévisionnel');
  }

}
