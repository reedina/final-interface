import { Component, OnInit } from '@angular/core';
import { MenuItem, DataTable, LazyLoadEvent } from "primeng/primeng";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";

import {Observable} from 'rxjs/Rx';
import { UserService } from './user.service';
import { IUser, User} from './user';
import {ITeam, Team} from '../teams/team';
import {Message} from 'primeng/primeng';
import { TeamService } from '../teams/team.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  msgs: Message[] = [];
  userForm: FormGroup;
  user: User = new User()
  users: Array<IUser>;
  teams: Array<ITeam>;  
  resp: any;

  constructor(private fb: FormBuilder, private userService: UserService, private teamService: TeamService) { 
    this.userForm = this.fb.group({
      first_name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      last_name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],   
      email:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(this.emailPattern)]],           

      });

  }

  ngOnInit() {

    this.userService.getUsers().
     do(res => console.log(res)).
     subscribe( res => { this.users = res });

     this.teamService.getTeams().
     do(res => console.log(res)).
     subscribe( res => { this.teams = res;});

  }

  showError(message: string) {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Error Message', detail: message});
}

  showSuccess(name: string) {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success', detail: `Added ${this.truncate(name)}`});
}

  truncate(string){
    if (string.length > 10)
       return string.substring(0,10)+'...';
    else
       return string;
}

  onReset() {
    this.userForm.reset();
}
}
