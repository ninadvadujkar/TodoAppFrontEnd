import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';

import { environment } from '../../environments/environment';
import { ApiResp } from '../models/apiResp';
import { ProcessHttprespService } from './process-httpresp.service';

const baseURL = environment.apiBaseUrl;

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * @description Todo Service. Has methods that call APIs related to /api/todo 
 */
@Injectable()
export class TodoService {

  constructor(private _http: Http, private _processHttpRespService: ProcessHttprespService) { }

  getTodos(): Observable<ApiResp> {
    const url = baseURL + 'todo';
    const headers = new Headers();
    headers.append('x-access-token', localStorage.getItem('token'));
    return this._http.get(url , { headers })
      .map(res => {
        return this._processHttpRespService.extractData(res);
      })
      .catch(error => {
        return this._processHttpRespService.handleError(error);
      });    
  }

  createTodo(payload): Observable<ApiResp> {
    const url = baseURL + 'todo';
    const headers = new Headers();
    headers.append('x-access-token', localStorage.getItem('token'));
    return this._http.post(url , payload, { headers })
      .map(res => {
        return this._processHttpRespService.extractData(res);
      })
      .catch(error => {
        return this._processHttpRespService.handleError(error);
      });
  }

  deleteTodo(id): Observable<ApiResp> {
    const url = `${baseURL}todo/${id}`;
    const headers = new Headers();
    headers.append('x-access-token', localStorage.getItem('token'));
    return this._http.delete(url, { headers })
      .map(res => {
        return this._processHttpRespService.extractData(res);
      })
      .catch(error => {
        return this._processHttpRespService.handleError(error);
      });
  }  

}
