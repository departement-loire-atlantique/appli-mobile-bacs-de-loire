import { Component } from '@angular/core';

import { ApiService } from '../../shared/services/api.service';
import { LiaisonService } from '../../shared/services/liaison.service';
import { AbstractPage } from '../abstract';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage extends AbstractPage {

  public firstWebcam: string;
  public secondWebcam: string;
  public date: Date;
  public currentLiaison: any;

  constructor(private liaisonService: LiaisonService, private apiService: ApiService) {
    super();
  }

  ionViewWillEnter() {
    this.subscription = this.liaisonService.currentDirectionObserver.subscribe(() => {
      this.getWebcams();
    });
  }

  async getWebcams() {
    this.currentLiaison = this.liaisonService.getCurrentLiaison();
    const currentDirection = this.liaisonService.getCurrent();

    this.firstWebcam = await this.apiService.getLatestWebcam(currentDirection.data.webcamIds[0]);
    this.secondWebcam = await this.apiService.getLatestWebcam(currentDirection.data.webcamIds[1]);

    this.date = new Date();
  }

}
