import { Component, Injector } from '@angular/core';
import { CurrentHoraire } from 'src/app/shared/models/horaire';
import { ApiService } from 'src/app/shared/services/api.service';
import { LiaisonService } from 'src/app/shared/services/liaison.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { AbstractPage } from '../abstract';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.page.html',
  styleUrls: ['./horaire.page.scss'],
})
export class HorairePage extends AbstractPage {

  public currentHoraire: CurrentHoraire;

  constructor(
    private apiService: ApiService,
    private utilService: UtilsService,
    injector: Injector
  ) {
    super(injector);
  }

  ionViewWillEnter() {
    this.subscription = this.liaisonService.currentDirectionObserver.subscribe(() => {
      this.getDataHoraire();
    });
  }

  async getDataHoraire() {
    this.startRequest();

    const params = this.liaisonService.getCurrent();
    let schedule: any;

    try {
      schedule = await this.apiService.getHoraireBacs(params.codeHoraire);
    } catch (error) {
      this.handleError();
    }

    this.currentHoraire = this.utilService.getCurrentHoraire(params.from.name, schedule);

    this.endRequest();
  }

}
