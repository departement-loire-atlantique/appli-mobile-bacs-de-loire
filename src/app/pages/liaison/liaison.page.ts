import { Component, OnDestroy, OnInit } from '@angular/core';

import { LiaisonService } from '../../shared/services/liaison.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liaison',
  templateUrl: './liaison.page.html',
  styleUrls: ['./liaison.page.scss'],
})
export class LiaisonPage implements OnInit, OnDestroy {

  public startPoint: string;
  public endPoint: string;

  private subscription: any;

  constructor(private liaisonService: LiaisonService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.liaisonService.currentDirectionObserver.subscribe(() => {
      const params = this.liaisonService.getCurrent();
      this.startPoint = params.from;
      this.endPoint = params.to;
    });
  }

  async changeQuai() {
    this.liaisonService.changeDirection();
  }

  ngOnDestroy() {
  }

}
