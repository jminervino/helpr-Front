import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { Chamado } from 'src/app/core/models/chamado';
import { ChamadosService } from 'src/app/core/services/chamados/chamados.service';

@Component({
  selector: 'app-cliente-aberto',
  templateUrl: './cliente-aberto.component.html',
  styleUrls: ['./cliente-aberto.component.scss']
})
export class ClienteAbertoComponent implements OnInit {
  chamados$: Observable<Chamado[]> = EMPTY

  constructor( @Inject(MAT_DIALOG_DATA) public data: number, private chamadoService: ChamadosService) { }


  displayedColumns: string[] = [
    'id',
    'titulo',
    'status',
    'prioridade',
    'observacoes',
  ];

  ngOnInit(): void {
    this.chamados$ = this.chamadoService.findReportChamadoCliente(this.data)
  }

  trackById(index: number, item: { id: number }): number {
    return item.id;
  }

}
