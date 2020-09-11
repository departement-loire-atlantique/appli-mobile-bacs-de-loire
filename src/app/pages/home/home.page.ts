import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AppState, Plugins } from '@capacitor/core';
import { IonRouterOutlet, MenuController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { langFr } from 'src/app/shared/models/constantesCD44';
import { ApiService } from 'src/app/shared/services/api.service';

import { environment } from '../../../environments/environment';
import { LiaisonService } from '../../shared/services/liaison.service';
import { UtilsService } from '../../shared/services/utils.service';

const { App, AdMob, SplashScreen } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {

  @ViewChild('svg') svg: ElementRef;
  private displayedElements: HTMLElement[] = [];
  private appStateChangeSubscription: Subscription;

  constructor(
    private liaisonService: LiaisonService,
    private menuController: MenuController,
    private apiService: ApiService,
    private routerOutlet: IonRouterOutlet,
    private platform: Platform,
    private utils: UtilsService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });

    this.showInterstitial();
  }

  ionViewWillEnter() {
    this.appStateChangeSubscription = this.utils.appStateChangeDetector().subscribe((status: AppState) => {
      if (status.isActive) {
        this.getEvents();
      }
    });
  }

  ionViewDidLeave() {
    if (this.appStateChangeSubscription) {
      this.appStateChangeSubscription.unsubscribe();
    }
  }

  showInterstitial() {
    if (this.platform.is('capacitor')) {
      AdMob.prepareInterstitial({
        adId: environment.adMobId,
        autoshow: true
      });

      AdMob.addListener('onAdLoaded', () => {
        AdMob.showInterstitial();
      });

      AdMob.addListener('onAdFailedToLoad', (info: boolean) => {
        console.log(info);
      });
    }
  }

  handleBackButton() {
    if (!this.routerOutlet.canGoBack()) {
      App.exitApp();
    }
  }

  ngAfterViewInit(): void {
    SplashScreen.hide();
    this.getEvents();
  }

  openLiaison(id: string, direction: string) {
    this.liaisonService.openLiaison(id, direction);
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  async getEvents() {
    this.hideEvents();

    const firstEvents = await this.apiService.getEvent(langFr.COUERON, langFr.LEPELLERIN);
    const secondtEvents = await this.apiService.getEvent(langFr.BASSEINDRE, langFr.INDRET);

    if (firstEvents && firstEvents.length) {
      this.showEvent('#perturbation-bi-i', 'clp', 'south');
    }
    if (secondtEvents && secondtEvents.length) {
      this.showEvent('#perturbation-c-lp', 'bii', 'south');
    }
  }

  showEvent(selector: string, id: string, liaison: string) {
    if (!this.svg) {
      return;
    }
    const clickLiaison = () => this.openLiaison(id, liaison);
    const zone = this.svg.nativeElement.querySelector(selector);
    zone.classList.add('pertubation-visible');
    zone.childNodes[2].onclick = clickLiaison;
    this.displayedElements.push(zone);
  }

  hideEvents() {
    if (this.displayedElements && this.displayedElements.length) {
      this.displayedElements.forEach((element: any) => {
        element.classList.remove('pertubation-visible');
        element.onclick = undefined;
        element.childNodes[2].onclick = undefined;
      });
      this.displayedElements = [];
    }
  }

}
