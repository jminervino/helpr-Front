import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { StatusChipComponent } from './components/status-chip/status-chip.component';
import { PrioridadeChipComponent } from './components/prioridade-chip/prioridade-chip.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    LoaderComponent,
    StatusChipComponent,
    PrioridadeChipComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoaderComponent,
    PrioridadeChipComponent,
    StatusChipComponent
  ]
})
export class SharedModule { }
