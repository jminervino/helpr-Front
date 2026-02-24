import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Chamado } from 'src/app/core/models/chamado';
import { ChamadosService } from 'src/app/core/services/chamados/chamados.service';
import { statusFromBackend } from 'src/app/shared/utils';

@Component({
  selector: 'app-chamado-detail',
  templateUrl: './chamado-detail.component.html',
  styleUrls: ['./chamado-detail.component.scss'],
})
export class ChamadoDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  errorMsg = '';
  error = false;
  loading = true;
  chamado: Chamado = {} as Chamado;

  constructor(
    private chamadosService: ChamadosService,
    private route: ActivatedRoute,
    private titleService: Title
    
  ) {}

  get heroStatusClass(): string {
    const s = statusFromBackend(this.chamado.status as any);
    return 'cd-hero--' + s.toLowerCase();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.chamadosService.findById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (chamado) => {
        this.chamado = chamado;
        this.loading = false;
        this.titleService.setTitle('Detalhes do chamado');
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        if (!this.errorMsg) this.errorMsg = 'Um erro aconteceu';
        this.error = true;
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
