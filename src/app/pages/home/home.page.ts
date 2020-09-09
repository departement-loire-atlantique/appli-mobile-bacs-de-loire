import { Component, OnInit } from '@angular/core';

import { LiaisonService } from '../../shared/services/liaison.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private liaisonService: LiaisonService) { }

  ngOnInit() { }

  openLiaison(id: string, direction: string) {
    this.liaisonService.openLiaison(id, direction);
  }

}
