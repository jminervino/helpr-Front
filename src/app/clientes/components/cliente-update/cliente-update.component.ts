import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ClientesService } from 'src/app/core/services/clientes/clientes.service';
import { profileChecked, profileCheckedFromNumbers, someTrue, perfilsToBackend } from 'src/app/shared/utils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.scss'],
})
export class ClienteUpdateComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  errorMsg = '';
  error = false;
  loading = true;

  clienteForm = this.fb.group({
    id: [null as number | null],
    nome: [null as string | null, [Validators.required]],
    cpf: [null as string | null, [Validators.required, Validators.maxLength(14)]],
    email: [null as string | null, [Validators.required, Validators.email]],
    senha: [null as string | null],
    perfils: this.fb.array([[false], [false], [false]], [someTrue]),
  });

  constructor(
    private route: ActivatedRoute,
    private clientesService: ClientesService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router,
    private titleService: Title
  ) {}

  onSubmit() {
    const { id, nome, cpf, email, senha } = this.clienteForm.getRawValue();
    const checked = ((this.clienteForm.value.perfils ?? []) as (boolean | null)[]).map((v) => !!v);
    const payload = {
      id: id!,
      nome: nome ?? '',
      cpf: cpf ?? '',
      email: email ?? '',
      senha: senha ?? '',
      perfils: perfilsToBackend(checked),
    };

    const ref = this.toast.loading('Atualizando cliente');

    this.clientesService.update(payload).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Cliente atualizado');
        this.router.navigate(['clientes']);
      },
      error: () => {
        ref.close();
      },
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.clientesService.findById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (cliente) => {
        cliente.senha = '';
        const raw = cliente.perfils ?? [];
        const perfils = Array.isArray(raw) && raw.length > 0 && typeof raw[0] === 'number'
          ? profileCheckedFromNumbers(raw as unknown as number[])
          : profileChecked(raw as string[]);
        this.clienteForm.patchValue({
          id: cliente.id ?? null,
          nome: cliente.nome,
          cpf: cliente.cpf,
          email: cliente.email,
          senha: cliente.senha,
        });
        this.clienteForm.get('perfils')?.setValue(perfils);
        this.loading = false;
        this.titleService.setTitle('Editar cliente');
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
