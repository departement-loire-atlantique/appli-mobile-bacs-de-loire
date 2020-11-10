import { Component, Injector } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DisplayBus } from 'src/app/shared/models/horaire';

import { Direction } from '../../shared/models/liaison';
import { AbstractPage } from '../abstract';

const items: any[] = [{ sens: 1, terminus: 'Mendès France - Bellevue', infotrafic: false, temps: 'Proche', dernierDepart: 'false', tempsReel: 'true', ligne: { numLigne: '81', typeLigne: 3 }, arret: { codeArret: 'BIND1' } }, { sens: 2, terminus: 'Porte de La Chapelle', infotrafic: false, temps: '3 mn', dernierDepart: 'false', tempsReel: 'true', ligne: { numLigne: '50', typeLigne: 3 }, arret: { codeArret: 'BIND3' } }, { sens: 1, terminus: 'Mendès France - Bellevue', infotrafic: false, temps: '18 mn', dernierDepart: 'false', tempsReel: 'false', ligne: { numLigne: '81', typeLigne: 3 }, arret: { codeArret: 'BIND1' } }, { sens: 2, terminus: 'Gare Maritime', infotrafic: false, temps: '20 mn', dernierDepart: 'false', tempsReel: 'true', ligne: { numLigne: '81', typeLigne: 3 }, arret: { codeArret: 'BIND2' } }, { sens: 2, terminus: 'Porte de La Chapelle', infotrafic: false, temps: '21 mn', dernierDepart: 'false', tempsReel: 'false', ligne: { numLigne: '50', typeLigne: 3 }, arret: { codeArret: 'BIND3' } }, { sens: 2, terminus: 'Porte de La Chapelle', infotrafic: false, temps: '39 mn', dernierDepart: 'false', tempsReel: 'false', ligne: { numLigne: '50', typeLigne: 3 }, arret: { codeArret: 'BIND3' } }, { sens: 1, terminus: 'Mendès France - Bellevue', infotrafic: false, temps: '42 mn', dernierDepart: 'false', tempsReel: 'false', ligne: { numLigne: '81', typeLigne: 3 }, arret: { codeArret: 'BIND1' } }, { sens: 2, terminus: 'Gare Maritime', infotrafic: false, temps: '44 mn', dernierDepart: 'false', tempsReel: 'false', ligne: { numLigne: '81', typeLigne: 3 }, arret: { codeArret: 'BIND2' } }, { sens: 2, terminus: 'Porte de La Chapelle', infotrafic: false, temps: '57 mn', dernierDepart: 'false', tempsReel: 'false', ligne: { numLigne: '50', typeLigne: 3 }, arret: { codeArret: 'BIND3' } }];

@Component({
  selector: 'app-bus',
  templateUrl: './bus.page.html',
  styleUrls: ['./bus.page.scss'],
})
export class BusPage extends AbstractPage {

  public infosLiaison: Direction;
  public displayBus: DisplayBus[] = [];
  public noBus: boolean;

  constructor(
    injector: Injector,
    private platform: Platform
  ) {
    super(injector);
  }

  async getData(event?: any) {
    this.startRequest();

    this.infosLiaison = this.liaisonService.getCurrent();

    this.noBus = this.infosLiaison.codeHoraire === 'liaison2' && this.infosLiaison.direction === 'south';

    if (!this.noBus) {
      try {
        if (!this.platform.is('capacitor')) {
          this.displayBus = this.utils.formatBus(items);
        } else {
          const bus = await this.apiService.getHoraireBus(this.infosLiaison.to.codeBus);
          if (bus && bus.length) {
            this.displayBus = this.utils.formatBus(bus);
          }
        }
      } catch (error) {
        this.handleError();
      }
    } else {
      this.displayBus = [];
    }

    if (event) {
      event.target.complete();
    }

    this.endRequest();
  }

}
