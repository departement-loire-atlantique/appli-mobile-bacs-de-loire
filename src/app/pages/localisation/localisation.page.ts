import { Component, Injector } from '@angular/core';
import { Platform } from '@ionic/angular';

import { AbstractPage } from '../abstract';
import { LiaisonService } from 'src/app/shared/services/liaison.service';

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

  constructor(injector: Injector, private platform: Platform, private liaisonService: LiaisonService) {
    super();
  }

  ionViewWillEnter() {
    this.subscription = this.liaisonService.currentDirectionObserver.subscribe(() => {
      this.getData();
    });
  }

  getData() {
    this.address = this.liaisonService.getCurrent().data.address;
    this.location = this.liaisonService.getCurrent().data.location;
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
