import { Component, OnInit } from '@angular/core';

import { MenuItem, DataTable, LazyLoadEvent } from "primeng/primeng";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import {Message} from 'primeng/primeng';

import {Observable} from 'rxjs/Rx';
import { EnvironmentInstancesService } from './environment-instances.service';
import { IEnvironmentInstance, EnvironmentInstance} from './environment-instance';
import { IEnvironment, Environment } from '../environments/environment';
import { EnvironmentService } from '../environments/environment.service';


@Component({
  selector: 'app-environment-instances',
  templateUrl: './environment-instances.component.html',
  styleUrls: ['./environment-instances.component.css']
})
export class EnvironmentInstancesComponent implements OnInit {

  msgs: Message[] = [];
  
  environmentInstance: EnvironmentInstance = new EnvironmentInstance()
  environmentInstances: Array<IEnvironment>;
  environments: Array<IEnvironment>;  
  resp: any;


  constructor(private environmentInstanceService: EnvironmentInstancesService, private environmentService: EnvironmentService) { }

  ngOnInit() {
    this.environmentInstanceService.getEnvironmentInstances().
    do(res => console.log(res)).
    subscribe( res => { this.environmentInstances = res });
  }

}
