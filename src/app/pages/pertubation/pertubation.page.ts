import { Component, OnInit } from '@angular/core';

import { LiaisonService } from '../../shared/services/liaison.service';

@Component({
  selector: 'app-pertubation',
  templateUrl: './pertubation.page.html',
  styleUrls: ['./pertubation.page.scss'],
})
export class PertubationPage implements OnInit {

  public params: any;

  constructor(private liaisonService: LiaisonService) {
  }

  ngOnInit() {
    this.liaisonService.currentDirectionObserver.subscribe(() => {
      this.params = this.liaisonService.getCurrent();
    });
  }

}
