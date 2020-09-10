import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { langFr } from 'src/app/shared/models/constantesCD44';
import { ApiService } from 'src/app/shared/services/api.service';

import { LiaisonService } from '../../shared/services/liaison.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  @ViewChild('svg') svg: ElementRef;
  private displayedElements: HTMLElement[] = [];

  constructor(private liaisonService: LiaisonService,
              private menuController: MenuController,
              private apiService: ApiService) { }

  ngAfterViewInit(): void {
    this.showEvent('#perturbation-bi-i', 'clp', 'south');
    this.showEvent('#perturbation-c-lp', 'bii', 'south');
    //this.hideEvent();
    //this.showEvents();
  }

  ngOnInit() {
  }



  openLiaison(id: string, direction: string) {
    this.liaisonService.openLiaison(id, direction);
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  async showEvents() {
    const firstEvents = await this.apiService.getEvent(langFr.COUERON, langFr.LEPELLERIN);
    const secondtEvents = await this.apiService.getEvent(langFr.BASSEINDRE, langFr.INDRET);
    if (firstEvents && firstEvents.length) {
      this.showEvent('#perturbation-bi-i', 'clp', 'south');
    }
    if (secondtEvents && secondtEvents.length) {
      this.showEvent('#perturbation-c-lp', 'bii', 'south');
    }
  }

  showEvent(zoneEvent: string, id: string, liaison: string) {
    if (!this.svg) {
      return;
    }
    const clickLiaison = () => this.openLiaison(id, liaison);
    const zone = this.svg.nativeElement.querySelector(zoneEvent);
    zone.classList.add('pertubation-visible');
    //zone.onclick = clickLiaison;
    zone.childNodes[2].onclick = clickLiaison;
    this.displayedElements.push(zone);
  }

  hideEvent() {
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
