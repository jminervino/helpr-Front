import { Tecnico } from 'src/app/core/models/pessoa';
import { Pessoa } from './../../../core/models/pessoa';
import { Component, Inject, OnInit } from '@angular/core';
import { TecnicosService } from 'src/app/core/services/tecnicos/tecnicos.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tecnico-detail',
  templateUrl: './tecnico-detail.component.html',
  styleUrls: ['./tecnico-detail.component.scss'],
})
export class TecnicoDetailComponent implements OnInit {
  tecnico$?: Observable<Tecnico>;

  constructor(
    private tecnicosService: TecnicosService,
    @Inject(MAT_DIALOG_DATA) private data: Pessoa
  ) {}

  ngOnInit(): void {
    this.tecnico$ = this.tecnicosService.findById(this.data.id!);
  }
}
