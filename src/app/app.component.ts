import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  subscription: any;
  userLoggedIn: boolean;

  constructor(private _router: Router, private _storeService: StoreService) {}

  ngOnInit() {
    this.subscription = this._storeService.currentData.subscribe(data => {
      console.log(data);
      this.userLoggedIn = data.userLoggedIn;
    });
  }
  
  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this._storeService.updateSharedData(false);
    this._router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
