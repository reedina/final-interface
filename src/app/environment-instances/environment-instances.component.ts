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

// var newDate = addDays(new Date(), 5);
  minDeleteDate =  this.addDays(new Date(), 1);
  environmentsDd = [];
  msgs: Message[] = [];
  environmentInstanceForm: FormGroup;
  environmentInstance: EnvironmentInstance = new EnvironmentInstance()
  environmentInstances: Array<IEnvironment>;
  environments: Array<IEnvironment>;  
  resp: any;


  constructor(private fb: FormBuilder,private environmentInstanceService: EnvironmentInstancesService, private environmentService: EnvironmentService) {
    this.environmentInstanceForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      deletion_time:  ['', [Validators.required]],
      environment: ['', [Validators.required]]
      });
   }

  ngOnInit() {
    this.environmentInstanceService.getEnvironmentInstances().
    do(res => console.log(res)).
    subscribe( res => { this.environmentInstances = res });

    this.environmentService.getEnvironments().
    do(res => console.log(res)).
    subscribe( res => { 
      this.environments = res;
      this.createEnvironmentsDropdown();
     });
  }

  createEnvironmentsDropdown() {
    
        this.environmentsDd = [];
        this.environmentsDd.push({label: 'Select Environment', value: null});
         for ( let t  of this.environments)     {
               let labelName = t.name + " - (" + t.type + ")";
              this.environmentsDd.push({label: labelName, value: t});
        }
    
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
  this.environmentInstanceForm.reset();
}

updateEnvironmentInstances() {
  this.environmentInstanceService.getEnvironmentInstances().
  do(res => console.log(res)).
  subscribe( res => { this.environmentInstances = res });
}

save(): void {
  if (this.environmentInstanceForm.dirty && this.environmentInstanceForm.valid) {
    console.log('Attempting to Save: ' + JSON.stringify(this.environmentInstanceForm.value))
    let t = Object.assign({}, this.environmentInstance, this.environmentInstanceForm.value);
    this.environmentInstanceService.saveEnvironmentInstance(t)
      .subscribe(
         (r) => {console.log(`Successfully Saved Form: ${r.name}`);
                 this.resp = r.name;
                 this.updateEnvironmentInstances();
                 this.environmentInstanceForm.reset();
                 this.showSuccess(r.name);
       },
           (e) => {  this.environmentInstanceForm.reset(); this.showError(e);}

      );
  }  else {
      // Remember, you only save a "valid" form
      console.log("Form not dirty and valid")
  }

}

addDays(theDate, days) {
  return new Date(theDate.getTime() + days*24*60*60*1000);
}
}
