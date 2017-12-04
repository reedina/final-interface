import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {ITeam} from './team'

@Injectable()
export class TeamService {

result: Array<any>;

  constructor(private http: Http) { }

  getTeams() {
        return this.http.get('http://localhost:4040/api/teams')
        .map(result => this.result  = result.json())
  }

}
