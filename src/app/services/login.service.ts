import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { environment } from '../../environments/environment';
import { ApiResp } from '../models/apiResp';
import { ProcessHttprespService } from './process-httpresp.service';

const baseURL = environment.apiBaseUrl;

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  constructor(private _http: Http, private _processHttpRespService: ProcessHttprespService) { }

  login(username, password): Observable<ApiResp> {
    const url = baseURL + 'login';
    return this._http.post(url, {username, password})
      .map(res => {
        return this._processHttpRespService.extractData(res);
      })
      .catch(error => {
        return this._processHttpRespService.handleError(error);
      });
  }

}
