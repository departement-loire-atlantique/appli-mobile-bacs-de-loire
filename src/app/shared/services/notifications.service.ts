import { Injectable } from '@angular/core';
import { FCM } from '@capacitor-community/fcm';
import { Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken } from '@capacitor/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';

import { PushModalComponent } from '../components/push-modal/push-modal.component';
import { CG44Notification } from '../models/notification';

import { StorageService } from './storage.service';

const { PushNotifications } = Plugins;
const fcm = new FCM();

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public readonly STORAGEKEY = 'is-subscribed';
  public readonly STORAGEKEY_TOPICS = 'subscription-topics';

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private storageService: StorageService,
    private alertController: AlertController
  ) { }

  async setup() {
    const stored = await this.storageService.get(this.STORAGEKEY);
    if (stored) {
      this.register();
    }
    if (stored === null) {
      this.askForSubscription();
    }
  }

  /**
   * Open an alert that ask the user if they want to subscribe to push notifications
   */
  async askForSubscription() {
    const askAlert = await this.alertController.create({
      cssClass: 'alert-modal',
      header: 'Notifications',
      message: 'Souhaitez-vous activer les notifications ?',
      buttons: [{
        text: 'Non merci',
        role: 'cancel',
        cssClass: 'secondary'
      }, {
        text: 'Ok',
        handler: () => {
          this.storageService.set(this.STORAGEKEY, true);
          this.register();
        }
      }]
    });
    return await askAlert.present();
  }

  /**
   * Subscribes to push notification in the "psn" topic
   */
  async subscribe(topic: string) {
    if (!this.platform.is('capacitor')) {
      console.log('Subscribe to notifications: ' + topic);
      return;
    }

    await fcm.subscribeTo({ topic });
    await this.setTopicSubscription(topic, true);
  }

  /**
   * Unsubscribes for the "psn" topic
   */
  async unsubscribe(topic: string) {
    if (!this.platform.is('capacitor')) {
      console.log('Unsubscribe from notifications: ' + topic);
      return;
    }

    await fcm.unsubscribeFrom({ topic });
    await this.setTopicSubscription(topic, false);
  }

  async setTopicSubscription(topic: string, value: boolean) {
    let currentValue = await this.storageService.get(this.STORAGEKEY_TOPICS);
    let hasSubscriptions = false;

    currentValue = currentValue || {};
    currentValue[topic] = value;

    for (const key in currentValue) {
      if (currentValue[key]) {
        hasSubscriptions = true;
      }
    }

    await this.storageService.set(this.STORAGEKEY, hasSubscriptions);
    await this.storageService.set(this.STORAGEKEY_TOPICS, currentValue);
  }

  async getSubscriptions() {
    return await this.storageService.get(this.STORAGEKEY_TOPICS).then(value => {
      return value || {};
    });
  }

  /**
   * Subscribes to push notifications
   */
  register() {
    if (!this.platform.is('capacitor')) {
      return;
    }

    // Only for IOS, android will always return granted
    PushNotifications.requestPermission().then((result) => {
      console.log(result);
      if (result.granted) {
        PushNotifications.register();
      }
    });

    // Subsribe to topic if registration succeeded
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      this.getSubscriptions().then(subs => {
        if (!Object.keys(subs).length) {
          this.subscribe('clp');
          this.subscribe('bii');
        } else {
          for (const key in subs) {
            if (Object.prototype.hasOwnProperty.call(subs, key)) {
              if (subs[key]) {
                this.subscribe(key);
              }
            }
          }
        }
      });
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      // TODO: Handle subscription error
      console.log(error);
    });

    // Received while in foreground
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      this.openNotificationModal(notification);
    });

    // Received while in background
    PushNotifications.addListener('pushNotificationActionPerformed', (event: PushNotificationActionPerformed) => {
      this.openNotificationModal(event.notification);
    });
  }

  /**
   * Opens the notification detail modal
   * @param notification notification received from firebase
   */
  async openNotificationModal(notification: CG44Notification) {
    const current = await this.modalController.getTop();
    if (current) {
      await current.dismiss();
    }
    const modal = await this.modalController.create({
      component: PushModalComponent,
      cssClass: 'notification-modal',
      componentProps: {
        notification
      }
    });
    modal.present();
  }
}
