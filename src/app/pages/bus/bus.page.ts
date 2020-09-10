import { Component, Injector, OnInit } from '@angular/core';
import { Bus, DisplayBus } from 'src/app/shared/models/horaire';
import { ApiService } from 'src/app/shared/services/api.service';
import { LiaisonService } from 'src/app/shared/services/liaison.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { AbstractPage } from '../abstract';

const items: any[] = [{ sens: 1, terminus: 'Mendès France - Bellevue', infotrafic: false, temps: 'Proche', dernierDepart: 'false', tempsReel: 'true', ligne: { numLigne: '81', typeLigne: 3 }, arret: { codeArret: 'BIND1' } }, { sens: 2, terminus: 'Porte de La Chapelle', infotrafic: false, temps: '3 mn', dernierDepart: 'false', tempsReel: 'true', ligne: { numLigne: '50', typeLigne: 3 }, arret: { codeArret: 'BIND3' } }, { sens: 1, terminus: 'Mendès France - Bellevue', infotrafic: false, temps: '18 mn', dernierDepart: 'false', tempsReel: 'false', ligne: { numLigne: '81', typeLigne: 3 }, arret: { codeArret: 'BIND1' } }, { sens: 2, terminus: 'Gare Maritime', infotrafic: false, temps: '20 mn', dernierDepart: 'false', tempsReel: 'true', ligne: { numLigne: '81', typeLigne: 3 }, arret: { codeArret: 'BIND2' } }, { sens: 2, terminus: 'Porte de La Chapelle', infotrafic: false, temps: '21 mn', dernierDepart: 'false', tempsReel: 'false', ligne: { numLigne: '50', typeLigne: 3 }, arret: { codeArret: 'BIND3' } }, { sens: 2, terminus: 'Porte de La Chapelle', infotrafic: false, temps: '39 mn', dernierDepart: 'false', tempsReel: 'false', ligne: { numLigne: '50', typeLigne: 3 }, arret: { codeArret: 'BIND3' } }, { sens: 1, terminus: 'Mendès France - Bellevue', infotrafic: false, temps: '42 mn', dernierDepart: 'false', tempsReel: 'false', ligne: { numLigne: '81', typeLigne: 3 }, arret: { codeArret: 'BIND1' } }, { sens: 2, terminus: 'Gare Maritime', infotrafic: false, temps: '44 mn', dernierDepart: 'false', tempsReel: 'false', ligne: { numLigne: '81', typeLigne: 3 }, arret: { codeArret: 'BIND2' } }, { sens: 2, terminus: 'Porte de La Chapelle', infotrafic: false, temps: '57 mn', dernierDepart: 'false', tempsReel: 'false', ligne: { numLigne: '50', typeLigne: 3 }, arret: { codeArret: 'BIND3' } }];

@Component({
  selector: 'app-bus',
  templateUrl: './bus.page.html',
  styleUrls: ['./bus.page.scss'],
})
export class BusPage extends AbstractPage implements OnInit {

  infosLiaison: any;
  displayBus: DisplayBus[];

  constructor(
    injector: Injector,
    private utilService: UtilsService,
    private apiService: ApiService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.liaisonService.currentDirectionObserver.subscribe(() => {
      this.getDataBus();
      // this.infosLiaison = this.liaisonService.getCurrent();
      // this.displayBus = this.utilService.formatBus(items);
    });
  }

  async getDataBus() {
    this.startRequest();

    this.infosLiaison = this.liaisonService.getCurrent();

    try {
      const bus = await this.apiService.getHoraireBus(this.infosLiaison.data.codeBus);
      if (bus && bus.length) {
        this.displayBus = this.utilService.formatBus(bus);
      }
    } catch (error) {
      this.handleError();
    }

    this.endRequest();
  }

}
