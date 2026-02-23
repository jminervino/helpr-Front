import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualDoSoftwareRoutingModule } from './manual-do-software-routing.module';
import { ManualDoSoftwareComponent } from './components/manual-do-software/manual-do-software.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ManualDoSoftwareComponent],
  imports: [
    CommonModule,
    ManualDoSoftwareRoutingModule,
    MatIconModule,
  ],
})
export class ManualDoSoftwareModule {}
