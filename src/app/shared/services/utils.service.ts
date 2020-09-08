import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private activatedRoute: ActivatedRoute) { }

  getCurrentLiaison() {
    return this.activatedRoute.snapshot.firstChild.paramMap.get('id');
  }

}
