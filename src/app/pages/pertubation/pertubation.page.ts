import { Component, OnInit } from '@angular/core';
import { KEYCHOICE } from 'src/app/shared/models/constantesCD44';
import { Pertubation } from 'src/app/shared/models/event';
import { ApiService } from 'src/app/shared/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { LiaisonService } from '../../shared/services/liaison.service';

@Component({
  selector: 'app-pertubation',
  templateUrl: './pertubation.page.html',
  styleUrls: ['./pertubation.page.scss'],
})
export class PertubationPage implements OnInit {

  public params: any;
  currentEvents: Pertubation[];
  upcomingEvents: Pertubation[];
  eventsList: Pertubation[];

  constructor(private utilService: UtilsService,
              private apiService: ApiService,
              private storageService: StorageService,
              private liaisonService: LiaisonService
    ) { }

  ngOnInit() {
    this.liaisonService.currentDirectionObserver.subscribe(() => {
      this.params = this.liaisonService.getCurrent();
      console.log('params ', this.params);
      const urlEvent = this.utilService.getTraficEventURL(this.params.from, this.params.to);
      this.getData(urlEvent);
    });
  }

  async getData(urlEvent: string) {
    this.eventsList = await this.apiService.getEvent(urlEvent);
    console.log('this.eventsList from API ', this.eventsList);

    this.eventsList = this.utilService.getEventsList();
    console.log('this.eventsList ', this.eventsList);
    this.currentEvents = this.eventsList.filter(el => el.status === 'en cours');
    this.upcomingEvents = this.eventsList.filter(el => el.status === 'prévisionnel');
  }


}
