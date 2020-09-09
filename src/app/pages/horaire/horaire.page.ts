import { Component, OnInit } from '@angular/core';
import { CurrentHoraire, Horaire } from 'src/app/shared/models/horaire';
import { ApiService } from 'src/app/shared/services/api.service';
import { LiaisonService } from 'src/app/shared/services/liaison.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { AbstractPage } from '../abstract';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.page.html',
  styleUrls: ['./horaire.page.scss'],
})
export class HorairePage extends AbstractPage implements OnInit {

  public currentHoraire: CurrentHoraire;

  constructor(
    private liaisonService: LiaisonService,
    private apiService: ApiService,
    private utilService: UtilsService) {
    super();
  }

  ngOnInit() {
    this.subscription = this.liaisonService.currentDirectionObserver.subscribe(() => {
      this.getDataHoraire();
    });

    this.enterEvent.subscribe(() => {
      this.getDataHoraire();
    });
  }

  async getDataHoraire() {
    const params = this.liaisonService.getCurrent();
    const horaire = await this.apiService.getHoraireBacs(params.data.codeHoraire);
    this.currentHoraire = this.utilService.getCurrentHoraire(params.from, horaire);
  }

}
