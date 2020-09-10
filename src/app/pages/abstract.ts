import { Component, Injector, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LiaisonService } from '../shared/services/liaison.service';

@Component({ template: '' })
export class AbstractPage implements OnDestroy {
  public subscription: Subscription;

  constructor() {
  }

  ionViewDidLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
