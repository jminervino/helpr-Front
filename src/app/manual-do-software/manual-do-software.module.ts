import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualDoSoftwareRoutingModule } from './manual-do-software-routing.module';
import { ManualDoSoftwareComponent } from './components/manual-do-software/manual-do-software.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    ManualDoSoftwareComponent
  ],
  imports: [
    CommonModule,
    ManualDoSoftwareRoutingModule,
    MatGridListModule,
    MatListModule
  ]
})
export class ManualDoSoftwareModule { }
