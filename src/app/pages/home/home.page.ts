import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private utilService: UtilsService) { }

  ngOnInit() {
    const liaison = this.utilService.formatChoixQuai('perturbation-c-lp');
    this.utilService.saveChoixQuai(liaison);
  }

}
