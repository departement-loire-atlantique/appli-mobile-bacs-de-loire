import { Component, Injector, OnDestroy } from '@angular/core';
import { AppState } from '@capacitor/core';
import { Subscription } from 'rxjs';

import { ApiService } from '../shared/services/api.service';
import { LiaisonService } from '../shared/services/liaison.service';
import { UtilsService } from '../shared/services/utils.service';

@Component({ template: '' })
export class AbstractPage implements OnDestroy {
  public liaisonService: LiaisonService;
  public utils: UtilsService;
  public apiService: ApiService;

  private appStateChangeSubscription: Subscription;
  public subscription: Subscription;
  public isFetching = true;
  public hasError = false;

  constructor(injector: Injector) {
    this.liaisonService = injector.get(LiaisonService);
    this.utils = injector.get(UtilsService);
    this.apiService = injector.get(ApiService);
  }

  ionViewWillEnter() {
    this.addAppStateChangeDetector();
    this.addDirectionChangeDetector();
  }

  ionViewDidLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.appStateChangeSubscription) {
      this.appStateChangeSubscription.unsubscribe();
    }
  }

  addAppStateChangeDetector() {
    this.appStateChangeSubscription = this.utils.appStateChangeDetector().subscribe((status: AppState) => {
      if (status.isActive) {
        this.getData();
      }
    });
  }

  addDirectionChangeDetector() {
    this.subscription = this.liaisonService.currentDirectionObserver.subscribe(() => {
      this.getData();
    });
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

  getData() { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.appStateChangeSubscription) {
      this.appStateChangeSubscription.unsubscribe();
    }
  }
}
