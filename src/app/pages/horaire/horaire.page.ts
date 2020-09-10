import { Component, Injector } from '@angular/core';
import { CurrentHoraire } from 'src/app/shared/models/horaire';
import { ApiService } from 'src/app/shared/services/api.service';
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
    const params = this.liaisonService.getCurrent();
    const horaire = await this.apiService.getHoraireBacs(params.codeHoraire);
    this.currentHoraire = this.utilService.getCurrentHoraire(params.from, horaire);
  }

}
