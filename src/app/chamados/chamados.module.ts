import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadosRoutingModule } from './chamados-routing.module';
import { ChamadosComponent } from './chamados.component';
import { ChamadoCreateComponent } from './components/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado-update/chamado-update.component';
import { ChamadoDetailComponent } from './components/chamado-detail/chamado-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    ChamadosComponent,
    ChamadoCreateComponent,
    ChamadoUpdateComponent,
    ChamadoDetailComponent,
  ],
  imports: [
    CommonModule,
    ChamadosRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class ChamadosModule { }
