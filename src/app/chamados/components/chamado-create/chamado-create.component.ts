import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { EMPTY, Observable } from 'rxjs';
import { Cliente, Tecnico } from 'src/app/core/models/pessoa';
import { ChamadosService } from 'src/app/core/services/chamados/chamados.service';
import { ClientesService } from 'src/app/core/services/clientes/clientes.service';
import { TecnicosService } from 'src/app/core/services/tecnicos/tecnicos.service';
import { prioridadeToBackend, statusToBackend } from 'src/app/shared/utils';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.scss'],
})
export class ChamadoCreateComponent implements OnInit {
  clientes$: Observable<Cliente[]> = EMPTY;
  tecnicos$: Observable<Tecnico[]> = EMPTY;

  chamadoForm = this.fb.group({
    prioridade: [null as string | null, [Validators.required]],
    status: [null as string | null, [Validators.required]],
    titulo: [null as string | null, [Validators.required]],
    observacoes: [null as string | null, [Validators.required]],
    tecnico: [null as number | null, [Validators.required]],
    cliente: [null as number | null, [Validators.required]],
  });

  constructor(
    private chamadosService: ChamadosService,
    private clientesService: ClientesService,
    private tecnicosService: TecnicosService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router
  ) {}

  onSubmit() {
    const raw = this.chamadoForm.getRawValue();
    const chamado = {
      prioridade: prioridadeToBackend(raw.prioridade!),
      status: statusToBackend(raw.status!),
      titulo: raw.titulo!,
      observacoes: raw.observacoes!,
      tecnico: raw.tecnico!,
      cliente: raw.cliente!,
    };

    const ref = this.toast.loading('Adicionando chamado...');
    this.chamadosService.create(chamado).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Chamado adicionado');
        this.router.navigate(['chamados']);
      },
      error: () => {
        ref.close();
      },
    });
  }

  ngOnInit(): void {
    this.clientes$ = this.clientesService.findAll();
    this.tecnicos$ = this.tecnicosService.findAll();
  }
}
