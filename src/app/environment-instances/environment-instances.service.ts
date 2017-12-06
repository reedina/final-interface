import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IEnvironmentInstance, EnvironmentInstance } from './environment-instance'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class EnvironmentInstancesService {
 
  result: Array<any>;

  constructor(private http: Http) { }

  getEnvironmentInstances() {
    return this.http.get('http://localhost:4050/api/environment/instances')
    .map(result => this.result  = result.json())
}
}
