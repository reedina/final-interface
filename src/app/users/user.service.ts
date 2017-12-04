import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { IUser } from './user'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

  result: Array<any>;

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get('http://localhost:4040/api/users')
    .map(result => this.result  = result.json())
}

}
