import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { EMPTY, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Tecnico } from '../core/models/pessoa';
import { TecnicosService } from '../core/services/tecnicos/tecnicos.service';
import { TecnicoDetailComponent } from './components/tecnico-detail/tecnico-detail.component';
import { TecnicoAndamentoComponent } from './components/tecnico-andamento/tecnico-andamento.component';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.scss']
})
export class TecnicosComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'cpf',
    'dataCriacao',
    'detalhe',
    'chamados',
    'acoes',
  ];

  tecnicos$: Observable<Tecnico[]> = EMPTY;
  private destroy$ = new Subject<void>();

  constructor(
    private tecnicosService: TecnicosService,
    private toast: HotToastService,
    private dialog: MatDialog,
  ) {}

  openDialog(tecnico: Tecnico): void {
    this.dialog.open(TecnicoDetailComponent, {
      width: '500px',
      data: { ...tecnico },
    });
  }

  openChamados(id: number): void {
    this.dialog.open(TecnicoAndamentoComponent, {
      data: id,
      width: '950px',
    });
  }

  onClickDelete(tecnico: Tecnico, id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      minWidth: '400px',
      data: {
        title: 'Deletar tecnico',
        message: `Deseja deletar ${tecnico.nome}?`,
      },
    });
    ref.afterClosed().pipe(
      filter((result) => !!result),
      switchMap(() => this.tecnicosService.delete(id)),
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.tecnicos$ = this.tecnicosService.findAll();
        this.toast.success('Usuário deletado');
      },
    });
  }

  ngOnInit(): void {
    this.tecnicos$ = this.tecnicosService.findAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackById(index: number, item: { id?: number }): number {
    return item.id ?? index;
  }

}
