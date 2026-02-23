import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ClientesService, ClienteCreatePayload } from 'src/app/core/services/clientes/clientes.service';
import { someTrue, perfilsToBackend } from 'src/app/shared/utils';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.scss'],
})
export class ClienteCreateComponent implements OnInit {
  ocultar = true;

  clienteForm = this.fb.group({
    nome: [null as string | null, [Validators.required]],
    cpf: [null as string | null, [Validators.required, Validators.maxLength(14)]],
    email: [null as string | null, [Validators.required, Validators.email]],
    perfils: this.fb.array([[false], [true], [false]], [someTrue]),
    senha: [null as string | null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private toast: HotToastService,
    private router: Router
  ) {}

  onSubmit() {
    const { nome, cpf, email, senha } = this.clienteForm.getRawValue();
    const checked = ((this.clienteForm.value.perfils ?? []) as (boolean | null)[]).map((v) => !!v);
    const payload: ClienteCreatePayload = {
      nome: nome ?? '',
      cpf: cpf ?? '',
      email: email ?? '',
      senha: senha ?? '',
      perfils: perfilsToBackend(checked),
    };

    const ref = this.toast.loading('Adicionando cliente');

    this.clientesService.create(payload).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Cliente criado');
        this.router.navigate(['clientes']);
      },
      error: () => {
        ref.close();
      },
    });
  }

  ngOnInit(): void {}
}
