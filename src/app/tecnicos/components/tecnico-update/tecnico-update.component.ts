import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Tecnico } from 'src/app/core/models/pessoa';
import { TecnicosService } from 'src/app/core/services/tecnicos/tecnicos.service';
import { someTrue, trueIndexes, profileChecked } from 'src/app/shared/utils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.scss']
})
export class TecnicoUpdateComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  errorMsg = '';
  error = false;
  loading = true;

  tecnicoForm = this.fb.group({
    id: [null as number | null],
    nome: [null as string | null, [Validators.required]],
    cpf: [null as string | null, [Validators.required, Validators.maxLength(14)]],
    email: [null as string | null, [Validators.required, Validators.email]],
    senha: [null as string | null],
    perfils: this.fb.array([[false], [false], [false]], [someTrue]),
  });

  constructor(
    private route: ActivatedRoute,
    private tecnicosService: TecnicosService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router,
    private titleService: Title
  ) {}

  onSubmit() {
    const tecnico = {
      ...this.tecnicoForm.value,
      perfils: trueIndexes(((this.tecnicoForm.value.perfils ?? []) as (boolean | null)[]).map((value) => !!value)),
    } as Tecnico;
    
    const ref = this.toast.loading('Atualizando tecnico');

    this.tecnicosService.update(tecnico).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Tecnico atualizado');
        this.router.navigate(['tecnicos']);
      },
      error: () => {
        ref.close();
      },
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.tecnicosService.findById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (tecnico) => {
        tecnico.senha = '';
        const perfils = profileChecked(tecnico.perfils as string[]);
        this.tecnicoForm.patchValue({
          id: tecnico.id ?? null,
          nome: tecnico.nome,
          cpf: tecnico.cpf,
          email: tecnico.email,
          senha: tecnico.senha,
        });
        this.tecnicoForm.get('perfils')?.setValue(perfils);
        this.loading = false;
        this.titleService.setTitle('Editar técnico');
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
