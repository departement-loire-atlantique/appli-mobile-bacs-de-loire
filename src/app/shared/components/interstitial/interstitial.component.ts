import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Interstitial } from '../../models/interstitial';

@Component({
  selector: 'app-interstitial',
  templateUrl: './interstitial.component.html',
  styleUrls: ['./interstitial.component.scss'],
})
export class InterstitialComponent implements OnInit {

  public data: Interstitial;
  public timeout: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.timeout = setTimeout(this.close.bind(this), this.data.duration);
  }

  close() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.modalController.dismiss();
  }

}
