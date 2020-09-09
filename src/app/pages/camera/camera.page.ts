import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/services/api.service';
import { LiaisonService } from '../../shared/services/liaison.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  public firstWebcam: string;
  public secondWebcam: string;
  public date: Date;
  public currentLiaison: any;

  constructor(private liaisonService: LiaisonService, private apiService: ApiService) { }

  ngOnInit() {
    this.liaisonService.currentDirectionObserver.subscribe(() => {
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
