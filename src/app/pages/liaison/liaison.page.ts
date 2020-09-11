import { Component, OnInit } from '@angular/core';

import { Direction } from '../../shared/models/liaison';
import { LiaisonService } from '../../shared/services/liaison.service';

@Component({
  selector: 'app-liaison',
  templateUrl: './liaison.page.html',
  styleUrls: ['./liaison.page.scss'],
})
export class LiaisonPage implements OnInit {

  public direction: Direction;

  constructor(private liaisonService: LiaisonService) { }

  ngOnInit() {
    this.liaisonService.currentDirectionObserver.subscribe(() => {
      this.direction = this.liaisonService.getCurrent();
    });
  }

  async changeQuai() {
    this.liaisonService.changeDirection();
  }

}
