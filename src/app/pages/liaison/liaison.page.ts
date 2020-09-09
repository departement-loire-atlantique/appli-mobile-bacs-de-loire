import { Component, OnInit } from '@angular/core';

import { LiaisonService } from '../../shared/services/liaison.service';

@Component({
  selector: 'app-liaison',
  templateUrl: './liaison.page.html',
  styleUrls: ['./liaison.page.scss'],
})
export class LiaisonPage implements OnInit {

  public startPoint: string;
  public endPoint: string;

  constructor(private liaisonService: LiaisonService) { }

  ngOnInit() {
    // Subscribe to direction change event
    this.liaisonService.currentDirectionObserver.subscribe(() => {
      console.log(this.liaisonService.getCurrentLiaisonData());
      this.startPoint = this.liaisonService.getStartPoint();
      this.endPoint = this.liaisonService.getEndPoint();
    });
  }

  async changeQuai() {
    this.liaisonService.changeDirection();
  }

}
