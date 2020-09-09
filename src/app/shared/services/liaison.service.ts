import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LiaisonService {

  public readonly STORAGEKEY = 'choice';

  public currentLiaisonId: any;
  public currentDirection: string;
  public currentDirectionObserver = new Subject();

  constructor(private storageService: StorageService, private router: Router) { }

  chooseLiaison(id: string, direction?: string) {
    this.currentLiaisonId = id;
    this.currentDirection = direction || 'north';

    this.storeCurrentChoice();
  }

  openLiaison(id: string, direction?: string) {
    this.chooseLiaison(id, direction || 'south');
    this.router.navigateByUrl('liaison/' + id);
  }

  /**
   * Toggle between north and south
   */
  changeDirection() {
    this.currentDirection = this.currentDirection === 'north' ? 'south' : 'north';
    this.currentDirectionObserver.next(this.currentDirection);

    this.storeCurrentChoice();
  }

  async storeCurrentChoice() {
    await this.storageService.set(this.STORAGEKEY, {
      liaison: this.currentLiaisonId,
      direction: this.currentDirection
    });
  }

  async setCurrentChoice() {
    const { liaison, direction } = await this.storageService.get(this.STORAGEKEY);

    this.currentLiaisonId = liaison;
    this.currentDirection = direction;
  }

  getCurrentLiaison() {
    return environment.liaisons.find(item => item.id === this.currentLiaisonId);
  }

  getCurrentDirection() {
    const currentLiaison = this.getCurrentLiaison();
    return currentLiaison[this.currentDirection + 'Params'];
  }

  /**
   * Returns the name of the start point according to the direction
   */
  getStartPoint() {
    const currentLiaison = this.getCurrentLiaison();
    return currentLiaison.names[this.currentDirection === 'north' ? 'south' : 'north'];
  }

  /**
   * Returns the name of the end point according to the direction
   */
  getEndPoint() {
    const currentLiaison = this.getCurrentLiaison();
    return currentLiaison.names[this.currentDirection];
  }
}
