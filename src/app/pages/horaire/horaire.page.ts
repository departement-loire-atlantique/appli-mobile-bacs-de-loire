import { Component, OnInit } from '@angular/core';
import { Horaire, CurrentHoraire } from 'src/app/shared/models/horaire';
import { ApiService } from 'src/app/shared/services/api.service';
import { LiaisonService } from 'src/app/shared/services/liaison.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.page.html',
  styleUrls: ['./horaire.page.scss'],
})
export class HorairePage implements OnInit {

  currentHoraire: CurrentHoraire;
  constructor(private liaisonService: LiaisonService,
              private apiService: ApiService,
              private utilService: UtilsService) { }

  ngOnInit() {
    this.liaisonService.currentDirectionObserver.subscribe(() => {
      const params = this.liaisonService.getCurrent();
      this.getDataHoraire(params.data.codeHoraire, params.from);
    });
  }

  async getDataHoraire(typeLiaison: string, from: string) {
    const horaire = await this.apiService.getHoraireBacs(typeLiaison);
    this.currentHoraire = this.utilService.getCurrentHoraire(from, horaire);
  }


}
