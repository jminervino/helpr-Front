import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TecnicosRoutingModule } from './tecnicos-routing.module';
import { TecnicosComponent } from './tecnicos.component';
import { TecnicoUpdateComponent } from './components/tecnico-update/tecnico-update.component';
import { TecnicoCreateComponent } from './components/tecnico-create/tecnico-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { TecnicoDetailComponent } from './components/tecnico-detail/tecnico-detail.component';
import { TecnicoAndamentoComponent } from './components/tecnico-andamento/tecnico-andamento.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    TecnicosComponent,
    TecnicoUpdateComponent,
    TecnicoCreateComponent,
    TecnicoDetailComponent,
    TecnicoAndamentoComponent,
  ],
  imports: [
    CommonModule,
    TecnicosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
})
export class TecnicosModule {}
