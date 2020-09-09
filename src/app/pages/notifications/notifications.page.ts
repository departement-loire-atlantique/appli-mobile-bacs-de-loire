import { Component, OnInit } from '@angular/core';

import { NotificationsService } from '../../shared/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public subscriptions = {
    clp: false,
    bii: false
  };

  public isLoading = true;

  constructor(private notificationsService: NotificationsService) {

  }

  getStoredSubscriptions() {
    this.notificationsService.getSubscriptions().then(subscriptions => {
      for (const key in subscriptions) {
        if (Object.prototype.hasOwnProperty.call(subscriptions, key)) {
          this.subscriptions[key] = subscriptions[key];
        }
      }

      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.getStoredSubscriptions();
  }

  async changeSubscription(topic: string) {
    this.isLoading = true;
    if (this.subscriptions[topic]) {
      await this.notificationsService.subscribe(topic);
    } else {
      await this.notificationsService.unsubscribe(topic);
    }
    this.isLoading = false;
  }

}
