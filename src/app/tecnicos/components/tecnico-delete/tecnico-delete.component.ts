import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tecnico } from 'src/app/core/models/pessoa';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.scss']
})
export class TecnicoDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public tecnico: Tecnico,
    private ref: MatDialogRef<TecnicoDeleteComponent>
  ) { }

  onSubmit() {
    this.ref.close({ tecnico: this.tecnico });
  }
}
