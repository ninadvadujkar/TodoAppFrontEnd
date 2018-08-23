import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
