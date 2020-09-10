import { Component, Injector } from '@angular/core';

import { ApiService } from '../../shared/services/api.service';
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

  constructor(injector: Injector, private apiService: ApiService) {
    super(injector);
  }

  ionViewWillEnter() {
    this.subscription = this.liaisonService.currentDirectionObserver.subscribe(() => {
      this.getWebcams();
    });
  }

  async getWebcams() {
    this.startRequest();

    this.currentLiaison = this.liaisonService.getCurrentLiaison();
    const currentDirection = this.liaisonService.getCurrent();

    try {
      this.firstWebcam = await this.apiService.getLatestWebcam(currentDirection.data.webcamIds[0]);
    } catch (error) {
      this.handleError();
    }

    try {
      this.secondWebcam = await this.apiService.getLatestWebcam(currentDirection.data.webcamIds[1]);
    } catch (error) {
      this.handleError();
    }

    this.date = new Date();

    this.endRequest();
  }

}
