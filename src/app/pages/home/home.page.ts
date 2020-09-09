import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { LiaisonService } from '../../shared/services/liaison.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private liaisonService: LiaisonService, private menuController: MenuController) { }

  ngOnInit() { }

  openLiaison(id: string, direction: string) {
    this.liaisonService.openLiaison(id, direction);
  }

  toggleMenu() {
    this.menuController.toggle();
  }

}
