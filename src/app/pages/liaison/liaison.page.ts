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

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(params, id);
    });
  }

  async changeQuai() {
    this.liaisonService.changeDirection();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
