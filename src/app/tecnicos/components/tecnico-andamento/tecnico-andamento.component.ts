import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { Chamado } from 'src/app/core/models/chamado';
import { ChamadosService } from 'src/app/core/services/chamados/chamados.service';

@Component({
  selector: 'app-tecnico-andamento',
  templateUrl: './tecnico-andamento.component.html',
  styleUrls: ['./tecnico-andamento.component.scss']
})
export class TecnicoAndamentoComponent implements OnInit {
  chamados$: Observable<Chamado[]> = EMPTY;

  displayedColumns: string[] = [
    'id',
    'titulo',
    'status',
    'prioridade',
    'observacoes',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private chamadoService: ChamadosService
  ) {}

  ngOnInit(): void {
    this.chamados$ = this.chamadoService.findReportChamadoTecnico(this.data);
  }

  trackById(index: number, item: { id: number }): number {
    return item.id;
  }
}
