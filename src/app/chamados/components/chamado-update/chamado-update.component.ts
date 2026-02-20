import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { delay, EMPTY, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Cliente, Tecnico } from 'src/app/core/models/pessoa';
import { ChamadosService } from 'src/app/core/services/chamados/chamados.service';
import { ClientesService } from 'src/app/core/services/clientes/clientes.service';
import { TecnicosService } from 'src/app/core/services/tecnicos/tecnicos.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.scss'],
})
export class ChamadoUpdateComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  clientes$: Observable<Cliente[]> = EMPTY;
  tecnicos$: Observable<Tecnico[]> = EMPTY;
  errorMsg = '';
  error = false;
  loading = true;

  chamadoForm = this.fb.group({
    id: [null as number | null],
    prioridade: [null as number | null, [Validators.required]],
    status: [null as number | null, [Validators.required]],
    titulo: [null as string | null, [Validators.required]],
    observacoes: [null as string | null, [Validators.required]],
    tecnico: [null as number | null, [Validators.required]],
    cliente: [null as number | null, [Validators.required]],
  });

  constructor(
    private clientesService: ClientesService,
    private tecnicosService: TecnicosService,
    private chamadosService: ChamadosService,
    private toast: HotToastService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private titleService: Title
  ) {}

  onSubmit() {
    const chamado = this.chamadoForm.getRawValue() as {
      id: number;
      prioridade: number;
      status: number;
      titulo: string;
      observacoes: string;
      tecnico: number;
      cliente: number;
    };

    const ref = this.toast.loading('Atualizando chamado...');
    this.chamadosService.update(chamado).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Chamado atualizado!');
        this.router.navigate(['chamados']);
      },
      error: (err) => {
        ref.close();
        switch (err.status) {
          case 403:
            return this.toast.error('Ação não permitida');
          default:
            return this.toast.error(
              `Um erro aconteceu: ${err.error.message ?? ''}`
            );
        }
      },
    });
  }

  resultadoCliente = false;
  resultadoTecnico = false;

  ngOnInit(): void {
     this.clientes$ = this.clientesService.findAll().pipe(delay(500) ,tap(() =>{
      this.resultadoCliente = true;
    }));

     this.tecnicos$ = this.tecnicosService.findAll().pipe(delay(500), tap(() =>{
      this.resultadoTecnico = true;
    }));

    const id = this.route.snapshot.params['id'];
    this.chamadosService.findById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (chamado) => {
        this.chamadoForm.patchValue({
          id: chamado.id,
          prioridade: chamado.prioridade,
          status: chamado.status,
          titulo: chamado.titulo,
          observacoes: chamado.observacoes,
          tecnico: chamado.tecnico,
          cliente: chamado.cliente,
        });
        this.loading = false;
        this.titleService.setTitle('Editar chamado');
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        if (!this.errorMsg) this.errorMsg = 'Um erro aconteceu';
        this.error = true;
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
