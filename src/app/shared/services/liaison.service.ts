import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Direction, Dock, Liaison } from '../models/liaison';

@Injectable({
  providedIn: 'root'
})
export class LiaisonService {

  public readonly STORAGEKEY = 'choice';

  public currentLiaisonId: any;
  public currentDirection: string;

  public readonly currentDirectionObserver = new BehaviorSubject('south');

  constructor(private router: Router) { }

  openLiaison(id: string, direction?: string) {
    this.chooseLiaison(id, direction || 'south');
    this.router.navigateByUrl('liaison/' + id);
  }

  /**
   * Toggle between north and south
   */
  changeDirection() {
    this.currentDirection = this.getDirectionName();
    this.currentDirectionObserver.next(this.currentDirection);
  }

  private chooseLiaison(id: string, direction?: string) {
    this.currentLiaisonId = id;
    this.currentDirection = direction || 'south';
  }

  getCurrentLiaison(): Liaison {
    return environment.liaisons.find(item => item.id === this.currentLiaisonId);
  }

  /**
   * When selecting the north dock, the direction is south and vice versa
   */
  private getDirectionName() {
    return this.currentDirection === 'north' ? 'south' : 'north';
  }

  /**
   * Returns the name of the start point according to the direction
   * start point = !direction (south when going north and vice versa)
   */
  getStartPoint(): Dock {
    const currentLiaison = this.getCurrentLiaison();
    return currentLiaison[this.getDirectionName()];
  }

  /**
   * Returns the name of the end point according to the direction
   * end point = direction (north when going north)
   */
  getEndPoint(): Dock {
    const currentLiaison = this.getCurrentLiaison();
    return currentLiaison[this.currentDirection];
  }

  getCurrent(): Direction {
    const currentLiaison = this.getCurrentLiaison();
    const current: Direction = {
      from: this.getStartPoint(),
      to: this.getEndPoint(),
      direction: this.currentDirection,
      codeHoraire: currentLiaison.codeHoraire
    };
    return current;
  }
}
