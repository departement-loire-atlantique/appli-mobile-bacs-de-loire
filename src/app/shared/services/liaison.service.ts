import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LiaisonService {

  public readonly STORAGEKEY = 'choice';

  public currentLiaison: any;
  public currentDirection: string;
  public currentDirectionObserver = new Subject();

  constructor(private storageService: StorageService) { }

  chooseLiaison(id: string, direction?: string) {
    this.currentLiaison = id;
    this.currentDirection = direction || 'north';

    this.storeCurrentChoice();
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
      liaison: this.currentLiaison,
      direction: this.currentDirection
    });
  }

  async setCurrentChoice() {
    const { liaison, direction } = await this.storageService.get(this.STORAGEKEY);

    this.currentLiaison = liaison;
    this.currentDirection = direction;
  }

  getCurrentLiaison() {
    return environment.liaisons.find(item => item.id === this.currentLiaison);
  }

  getCurrentDirection() {
    const currentLiaison = this.getCurrentLiaison();
    return currentLiaison[this.currentDirection + 'Params'];
  }

  getStartPoint() {
    const currentLiaison = this.getCurrentLiaison();
    return currentLiaison.names[this.currentDirection === 'north' ? 'south' : 'north'];
  }

  getEndPoint() {
    const currentLiaison = this.getCurrentLiaison();
    return currentLiaison.names[this.currentDirection];
  }
}
