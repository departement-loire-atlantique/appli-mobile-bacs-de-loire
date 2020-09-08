import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KEYCHOICE } from 'src/app/shared/models/constantesCD44';
import { Liaison } from 'src/app/shared/models/liaison';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-liaison',
  templateUrl: './liaison.page.html',
  styleUrls: ['./liaison.page.scss'],
})
export class LiaisonPage implements OnInit {

  liaison: Liaison = new Liaison();
  constructor(private utilService: UtilsService,
              private storageService: StorageService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.storageService.get(KEYCHOICE).then(data => {
      this.liaison = data;
    });
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(params, id);
    });
  }

  async changeQuai(){
    this.liaison = this.utilService.formatChoixQuai(this.liaison.to.toLocaleLowerCase());
    await this.utilService.saveChoixQuai(this.liaison);
  }

}
