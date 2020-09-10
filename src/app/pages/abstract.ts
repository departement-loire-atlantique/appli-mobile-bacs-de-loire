import { Component, Injector, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LiaisonService } from '../shared/services/liaison.service';

@Component({ template: '' })
export class AbstractPage implements OnDestroy {
  public subscription: Subscription;
  public liaisonService: LiaisonService;
  public isFetching = true;
  public hasError = false;

  constructor(injector: Injector) {
    this.liaisonService = injector.get(LiaisonService);
  }

  ionViewDidLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleError() {
    this.hasError = true;
    this.isFetching = false;
  }

  startRequest() {
    this.isFetching = true;
    this.hasError = false;
  }

  endRequest() {
    this.isFetching = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
