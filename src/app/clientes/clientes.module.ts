import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ClienteUpdateComponent } from './components/cliente-update/cliente-update.component';
import { ClienteCreateComponent } from './components/cliente-create/cliente-create.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { ClienteAbertoComponent } from './components/cliente-aberto/cliente-aberto.component';
import { ClienteDetailComponent } from './components/cliente-detail/cliente-detail.component';
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
    ClientesComponent,
    ClienteUpdateComponent,
    ClienteCreateComponent,
    ClienteAbertoComponent,
    ClienteDetailComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    SharedModule,
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
export class ClientesModule {}
