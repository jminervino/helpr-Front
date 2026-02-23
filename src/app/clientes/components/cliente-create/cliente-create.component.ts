import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Cliente } from 'src/app/core/models/pessoa';
import { ClientesService } from 'src/app/core/services/clientes/clientes.service';
import { someTrue, selectedPerfils } from 'src/app/shared/utils';

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
    senha: [null as string | null, [Validators.required]],
    perfils: this.fb.array([[false], [true], [false]], [someTrue]),
  });

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private toast: HotToastService,
    private router: Router
  ) {}

  onSubmit() {
    const cliente = {
      ...this.clienteForm.value,
      perfils: selectedPerfils(((this.clienteForm.value.perfils ?? []) as (boolean | null)[]).map((value) => !!value)),
    } as Cliente;

    const ref = this.toast.loading('Adicionando cliente');

    this.clientesService.create(cliente).subscribe({
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
