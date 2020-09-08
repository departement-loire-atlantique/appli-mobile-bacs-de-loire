import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-pertubation',
  templateUrl: './pertubation.page.html',
  styleUrls: ['./pertubation.page.scss'],
})
export class PertubationPage implements OnInit {

  constructor(private utils: UtilsService) {
    const currentID = this.utils.getCurrentLiaison();
    console.log(currentID);
  }

  ngOnInit() {
  }

}
