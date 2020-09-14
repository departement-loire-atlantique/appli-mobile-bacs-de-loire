import { Component, Injector } from '@angular/core';
import { CurrentHoraire } from 'src/app/shared/models/horaire';

import { AbstractPage } from '../abstract';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.page.html',
  styleUrls: ['./horaire.page.scss'],
})
export class HorairePage extends AbstractPage {

  public currentHoraire: CurrentHoraire;

  constructor(injector: Injector) {
    super(injector);
  }

  async getData() {
    this.startRequest();

    const params = this.liaisonService.getCurrent();
    let schedule: any;

    try {
      schedule = await this.apiService.getHoraireBacs(params.codeHoraire);
    } catch (error) {
      this.handleError();
    }

    this.currentHoraire = this.utils.getCurrentHoraire(params.from.name, schedule);

    this.endRequest();
  }

}
