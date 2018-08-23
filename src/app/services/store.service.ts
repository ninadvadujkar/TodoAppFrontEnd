import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * @description This is a shared service that can be subscribed to. It always returns the latest data.
 */
@Injectable()
export class StoreService {
  private sharedData = new BehaviorSubject<any>({
    userLoggedIn: localStorage.getItem('username') && localStorage.getItem('token') ? true : false,
  });
  currentData = this.sharedData.asObservable();

  constructor() { }

  updateSharedData(userLoggedIn) {
    this.sharedData.next({userLoggedIn});
  }
}
