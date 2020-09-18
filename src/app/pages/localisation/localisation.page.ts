import { Component, Injector } from '@angular/core';
import { Platform } from '@ionic/angular';

import { AbstractPage } from '../abstract';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.page.html',
  styleUrls: ['./localisation.page.scss'],
})
export class LocalisationPage extends AbstractPage {

  public address = '';
  public location: {
    lat?: string,
    lng?: string,
    placeQuery?: string
  } = {};

  constructor(injector: Injector, private platform: Platform) {
    super(injector);
  }

  getData() {
    const currentDirection = this.liaisonService.getCurrent();
    this.address = currentDirection.from.address;
    this.location = currentDirection.from.location;
  }

  openMap() {
    if (this.platform.is('ios')) {
      window.open(`maps://?q=${this.location.lat},${this.location.lng}`, '_system');
    } else if (this.platform.is('android')) {
      window.open(`geo:${this.location.lat},${this.location.lng}?q=${this.location.placeQuery}`, '_system');
    } else {
      window.open(`https://www.google.com/maps/search/${this.location.lat},${this.location.lng}`, '_blank');
    }
  }

}
