import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class AbstractPage implements OnDestroy {
  public subscription: Subscription;

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
