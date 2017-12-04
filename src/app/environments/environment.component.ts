import { Component, OnInit } from '@angular/core';
import { MenuItem, DataTable, LazyLoadEvent } from "primeng/primeng";

import {Observable} from 'rxjs/Rx';
import { EnvironmentService } from './environment.service';
import { IEnvironment } from './environment';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {

  environments: Array<IEnvironment>;
  
    constructor(private environmentService: EnvironmentService) { }
  
    ngOnInit() {
  
      this.environmentService.getEnvironments().
       do(res => console.log(res)).
       subscribe( res => { this.environments = res });
  
    }

}
