import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { StatusChipComponent } from './components/status-chip/status-chip.component';
import { PrioridadeChipComponent } from './components/prioridade-chip/prioridade-chip.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    LoaderComponent,
    StatusChipComponent,
    PrioridadeChipComponent,
    ConfirmDialogComponent,
    PageHeaderComponent,
    EmptyStateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    LoaderComponent,
    PrioridadeChipComponent,
    StatusChipComponent,
    ConfirmDialogComponent,
    PageHeaderComponent,
    EmptyStateComponent,
  ],
})
export class SharedModule { }
