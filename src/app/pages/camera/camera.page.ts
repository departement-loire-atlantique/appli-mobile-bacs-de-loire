import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiService } from '../../shared/services/api.service';
import { LiaisonService } from '../../shared/services/liaison.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit, OnDestroy {

  public firstWebcam: string;
  public secondWebcam: string;
  public date: Date;
  public currentLiaison: any;
  public sub: Subscription;

  constructor(private liaisonService: LiaisonService, private apiService: ApiService) { }

  ngOnInit() {
    this.sub = this.liaisonService.currentDirectionObserver.subscribe(() => {
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
