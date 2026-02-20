import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { StatusChipComponent } from './components/status-chip/status-chip.component';
import { PrioridadeChipComponent } from './components/prioridade-chip/prioridade-chip.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    LoaderComponent,
    StatusChipComponent,
    PrioridadeChipComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    LoaderComponent,
    PrioridadeChipComponent,
    StatusChipComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
