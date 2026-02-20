import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { EMPTY, Observable, Subject, takeUntil } from 'rxjs';
import { Cliente } from '../core/models/pessoa';
import { ClientesService } from '../core/services/clientes/clientes.service';
import { ClienteAbertoComponent } from './components/cliente-aberto/cliente-aberto.component';
import { ClienteDeleteComponent } from './components/cliente-delete/cliente-delete.component';
import { ClienteDetailComponent } from './components/cliente-detail/cliente-detail.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'cpf',
    'dataCriacao',
    'detalhe',
    'acoes', // btn -> editar e deletar
  ];

  clientes$: Observable<Cliente[]> = EMPTY;


  constructor(
    private clientesService: ClientesService,
    private toast: HotToastService,
    private dialog : MatDialog,
    private router: Router,
  ) {}

  onClickDelete(cliente: Cliente, id: number) {
    const ref = this.dialog.open(ClienteDeleteComponent, {
      minWidth: '400px',
      data: cliente,
    });
    ref.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (result) => {
        if (result) {
          this.clientesService.delete(id).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: () => {
              this.clientes$ = this.clientesService.findAll();
              this.toast.success('Usuário deletado');
              ref.close();
            },
            error: (err) => {
              ref.close();
              switch (err.status) {
                case 403:
                  return this.toast.error('Usuário não tem permissão');
                case 409:
                  return this.toast.error(err.error.message);
                default:
                  return this.toast.error('Um erro aconteceu');
              }
            },
          });
        }
      },
    });
  }
 onClickCliente(id: number){
    this.dialog.open(ClienteAbertoComponent,{
      data: id,
      width: '950px'
    });
  }

  openDialog(tecnico: Cliente): void {
    this.dialog.open(ClienteDetailComponent, {
     width: '500px',
     data: { ...tecnico },
   });
  }

  ngOnInit(): void {
    this.clientes$ = this.clientesService.findAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
