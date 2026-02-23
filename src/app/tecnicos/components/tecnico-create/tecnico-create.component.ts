import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { TecnicosService } from 'src/app/core/services/tecnicos/tecnicos.service';
import { someTrue, perfilsToBackend } from 'src/app/shared/utils';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.scss'],
})
export class TecnicoCreateComponent implements OnInit {
  tecnicoForm = this.fb.group({
    nome: [null as string | null, [Validators.required]],
    cpf: [null as string | null, [Validators.required, Validators.maxLength(14)]],
    email: [null as string | null, [Validators.required, Validators.email]],
    senha: [null as string | null, [Validators.required]],
    perfils: this.fb.array([[false], [false], [true]], [someTrue]),
  });

  constructor(
    private fb: FormBuilder,
    private tecnicosService: TecnicosService,
    private toast: HotToastService,
    private router: Router
  ) {}

  onSubmit() {
    const { nome, cpf, email, senha } = this.tecnicoForm.getRawValue();
    const checked = ((this.tecnicoForm.value.perfils ?? []) as (boolean | null)[]).map((v) => !!v);
    const payload = {
      nome: nome ?? '',
      cpf: cpf ?? '',
      email: email ?? '',
      senha: senha ?? '',
      perfils: perfilsToBackend(checked),
    };

    const ref = this.toast.loading('Adicionando tecnico');

    this.tecnicosService.create(payload).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Tecnico criado');
        this.router.navigate(['tecnicos']);
      },
      error: () => {
        ref.close();
      },
    });
  }

  ngOnInit(): void {}
}
