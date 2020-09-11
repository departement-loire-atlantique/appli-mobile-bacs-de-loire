import { Component, Injector } from '@angular/core';

import { Dock } from '../../shared/models/liaison';
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

  public startPoint: Dock;
  public endPoint: Dock;

  constructor(injector: Injector) {
    super(injector);
  }

  async getData() {
    this.startRequest();

    const currentDirection = this.liaisonService.getCurrent();

    this.startPoint = currentDirection.from;
    this.endPoint = currentDirection.to;

    try {
      this.firstWebcam = await this.apiService.getLatestWebcam(this.startPoint.webcamId);
    } catch (error) {
      this.handleError();
    }

    try {
      this.secondWebcam = await this.apiService.getLatestWebcam(this.endPoint.webcamId);
    } catch (error) {
      this.handleError();
    }

    this.date = new Date();

    this.endRequest();
  }

}
