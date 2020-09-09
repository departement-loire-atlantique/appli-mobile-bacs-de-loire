import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LiaisonService {

  public readonly STORAGEKEY = 'choice';

  public currentLiaisonId: any;
  public currentDirection: string;

  public readonly currentDirectionObserver = new BehaviorSubject('south');

  constructor(private router: Router) { }

  chooseLiaison(id: string, direction?: string) {
    this.currentLiaisonId = id;
    this.currentDirection = direction || 'south';
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
  }

  getCurrentLiaison() {
    return environment.liaisons.find(item => item.id === this.currentLiaisonId);
  }

  getCurrentDirection() {
    const currentLiaison = this.getCurrentLiaison();
    return currentLiaison[this.currentDirection === 'north' ? 'south' : 'north'];
  }

  /**
   * Returns the name of the start point according to the direction
   */
  getStartPoint() {
    const currentLiaison = this.getCurrentLiaison();
    return currentLiaison[this.currentDirection === 'north' ? 'south' : 'north'].name;
  }

  /**
   * Returns the name of the end point according to the direction
   */
  getEndPoint() {
    const currentLiaison = this.getCurrentLiaison();
    return currentLiaison[this.currentDirection].name;
  }

  getCurrentLiaisonData() {
    return {
      from: this.getStartPoint(),
      to: this.getEndPoint(),
      data: this.getCurrentDirection()
    };
  }
}
