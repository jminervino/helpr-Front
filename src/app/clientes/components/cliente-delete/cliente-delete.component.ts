import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/core/models/pessoa';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.scss']
})
export class ClienteDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente,
    private ref: MatDialogRef<ClienteDeleteComponent>
  ) { }

  onSubmit() {
    this.ref.close({ cliente: this.cliente });
  }
}
