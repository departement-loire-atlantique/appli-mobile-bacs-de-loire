import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pertubation } from 'src/app/shared/models/event';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { LiaisonService } from '../../shared/services/liaison.service';

@Component({
  selector: 'app-pertubation',
  templateUrl: './pertubation.page.html',
  styleUrls: ['./pertubation.page.scss'],
})
export class PertubationPage implements OnInit, OnDestroy {

  currentEvents: Pertubation[];
  upcomingEvents: Pertubation[];
  eventsList: Pertubation[];

  private sub: Subscription;

  constructor(
    private utilService: UtilsService,
    private apiService: ApiService,
    private liaisonService: LiaisonService
  ) { }

  ngOnInit() {
    this.sub = this.liaisonService.currentDirectionObserver.subscribe(() => {
      const params = this.liaisonService.getCurrent();
      console.log('params ', params);
      this.getData(params.from, params.to);
    });
  }

  async getData(from: string, to: string) {
    this.eventsList = await this.apiService.getEvent(from, to);
    console.log('this.eventsList from API ', this.eventsList);

    this.eventsList = this.utilService.getEventsList();
    console.log('this.eventsList ', this.eventsList);
    this.currentEvents = this.eventsList.filter(el => el.status === 'en cours');
    this.upcomingEvents = this.eventsList.filter(el => el.status === 'prévisionnel');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
