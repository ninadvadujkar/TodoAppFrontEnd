import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/observable/throw';

@Injectable()
export class ProcessHttprespService {

  constructor() { }

  public extractData(res: Response) {
    let body = res.json();

    return body || {};
  }

  public handleError(error: Response | any) {
    let errObj: object;
    if(error instanceof Response) {
      errObj = error;
    } else {
      console.log("Error not an instance of response!");
      errObj = error.message ? error.message : error.toString();
    }
    return Observable.throw(errObj);
  }  

}
