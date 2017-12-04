import { Component, OnInit } from '@angular/core';
import { MenuItem, DataTable, LazyLoadEvent } from "primeng/primeng";

import {Observable} from 'rxjs/Rx';
import { UserService } from './user.service';
import { IUser} from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Array<IUser>;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getUsers().
     do(res => console.log(res)).
     subscribe( res => { this.users = res });

  }
}
