import { EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class AbstractPage implements OnDestroy {
  public subscription: Subscription;

  public enterEvent: EventEmitter<any> = new EventEmitter();
  public firstDisplay = true;

  ionViewWillEnter() {
    if (!this.firstDisplay) {
      this.enterEvent.emit();
    }
    this.firstDisplay = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.enterEvent.unsubscribe();
  }
}
