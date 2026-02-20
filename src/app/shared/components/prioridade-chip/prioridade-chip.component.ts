import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Prioridade } from 'src/app/core/models/chamado';

@Component({
  selector: 'app-prioridade-chip',
  templateUrl: './prioridade-chip.component.html',
  styleUrls: ['./prioridade-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrioridadeChipComponent implements OnInit {
  @Input() prioridade!: Prioridade;
  prioridadeLabel: string = '';
  prioridadeClass: string = '';

  ngOnInit(): void {
    switch (this.prioridade) {
      case Prioridade.BAIXA:
        this.prioridadeLabel = 'Baixa';
        this.prioridadeClass = 'baixa';
        break;
      case Prioridade.MEDIA:
        this.prioridadeLabel = 'Média';
        this.prioridadeClass = 'media';
        break;
      case Prioridade.ALTA:
        this.prioridadeLabel = 'Alta';
        this.prioridadeClass = 'alta';
    }
  }
}
