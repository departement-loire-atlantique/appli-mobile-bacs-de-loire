import { Component, Injector, NgZone, OnDestroy } from '@angular/core';
import { AppState } from '@capacitor/core';
import { Subscription } from 'rxjs';

import { ApiService } from '../shared/services/api.service';
import { LiaisonService } from '../shared/services/liaison.service';
import { UtilsService } from '../shared/services/utils.service';

@Component({ template: '' })
export abstract class AbstractPage implements OnDestroy {
  public liaisonService: LiaisonService;
  public utils: UtilsService;
  public apiService: ApiService;
  public zone: NgZone;

  private appStateChangeSubscription: Subscription;
  public subscription: Subscription;
  public isFetching = true;
  public hasError = false;

  constructor(injector: Injector) {
    this.liaisonService = injector.get(LiaisonService);
    this.utils = injector.get(UtilsService);
    this.apiService = injector.get(ApiService);
    this.zone = injector.get(NgZone);
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

  /**
   * Update data when the app comes back in front
   */
  addAppStateChangeDetector() {
    this.appStateChangeSubscription = this.utils.appStateChangeDetector().subscribe((status: AppState) => {
      if (status.isActive) {
        this.zone.run(() => {
          this.getData();
        });
      }
    });
  }

  /**
   * Update data when the network is back online
   */
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

  abstract getData(event?: any): void;

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.appStateChangeSubscription) {
      this.appStateChangeSubscription.unsubscribe();
    }
  }
}
