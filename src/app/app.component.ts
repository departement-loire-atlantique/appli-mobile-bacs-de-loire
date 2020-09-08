import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import { SocialNetwork } from './shared/models/social-network';
import { AnalyticsService } from './shared/services/analytics.service';
import { NotificationsService } from './shared/services/notifications.service';
import { RemoteConfigService } from './shared/services/remote-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public pages = [
    {
      title: 'Notifications',
      url: '/notifications'
    }
  ];

  public socialNetworks: SocialNetwork[] = [];

  constructor(
    private platform: Platform,
    private router: Router,
    private analyticsService: AnalyticsService,
    private notificationService: NotificationsService,
    private remoteConfigService: RemoteConfigService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      // Always reset app navigation to root page
      this.router.navigateByUrl('/');

      // Setup notifications
      this.notificationService.setup();

      await this.getRemoteContent();

      // Enable analytics
      this.analyticsService.enableAnalytics();
      this.analyticsService.enableCrashlytics();
    });
  }

  /**
   * Call Firebase remote-config to get social networks config and content pages
   */
  async getRemoteContent() {
    // Get remote config from firebase
    this.socialNetworks = await this.remoteConfigService.get('social_networks');
    const configPages = await this.remoteConfigService.get('pages');
    this.setPages(configPages);
  }

  /**
   * Add remote config pages in front of local pages
   * @param pages pages defined in firebase remote config
   */
  setPages(pages) {
    const remotePages = pages.map(page => {
      return {
        title: page.title,
        url: '/content-page',
        params: {
          id: page.id
        }
      };
    });

    this.pages = [...remotePages, ...this.pages];
  }
}
