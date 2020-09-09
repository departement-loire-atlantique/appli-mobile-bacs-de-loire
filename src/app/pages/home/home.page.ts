import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LiaisonService } from '../../shared/services/liaison.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private liaisonService: LiaisonService, private router: Router) { }

  ngOnInit() { }

  openLiaison(id: string, direction: string) {
    this.liaisonService.chooseLiaison(id, direction);
    this.router.navigateByUrl('liaison/' + id);
  }

}
