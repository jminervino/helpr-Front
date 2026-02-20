import { Pessoa } from './../core/models/pessoa';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, EMPTY, Subject, takeUntil, Subscription } from 'rxjs';
import { Tecnico } from '../core/models/pessoa';
import { TecnicosService } from '../core/services/tecnicos/tecnicos.service';
import { TecnicoDetailComponent } from './components/tecnico-detail/tecnico-detail.component';
import { TecnicoDeleteComponent } from './components/tecnico-delete/tecnico-delete.component';



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
    'acoes', // btn -> editar e deletar
  ];

  tecnicos$: Observable<Tecnico[]> = EMPTY;


  pessoa: Pessoa = {} as Pessoa;



  data: any;

  currentDialog?: MatDialogRef<any> ;
  private destroy$ = new Subject<void>();

  constructor(
    private tecnicosService: TecnicosService,
    private toast: HotToastService,
     private dialog: MatDialog,
     private route: ActivatedRoute,
     private router: Router,
  )  {
  }

  openDialog(tecnico: Tecnico): void {
     this.dialog.open(TecnicoDetailComponent, {
      width: '500px',
      data: { ...tecnico },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.pessoa = result;
    //   this.router.navigate(['.'], { relativeTo: this.route });
    // });
  }

  onClickDelete(cliente: Tecnico, id: number) {
    const ref = this.dialog.open(TecnicoDeleteComponent, {
      minWidth: '400px',
      data: cliente,
    });
    ref.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (result) => {
        if (result) {
          this.tecnicosService.delete(id).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: () => {
              this.tecnicos$ = this.tecnicosService.findAll();
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

  ngOnInit(): void {
    this.tecnicos$ = this.tecnicosService.findAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
