import { Component, OnInit } from '@angular/core';
import { MenuItem, DataTable, LazyLoadEvent } from "primeng/primeng";

import {Observable} from 'rxjs/Rx';
import { ProjectService } from './project.service';
import { IProject} from './project';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Array<IProject>;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().
    do(res => console.log(res)).
    subscribe( res => { this.projects = res });    
  }

}
