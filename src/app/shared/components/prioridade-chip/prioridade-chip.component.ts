import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Prioridade } from 'src/app/core/models/chamado';

const PRIORIDADE_FROM_INDEX: Record<number, Prioridade> = {
  0: Prioridade.BAIXA,
  1: Prioridade.MEDIA,
  2: Prioridade.ALTA,
};

@Component({
  selector: 'app-prioridade-chip',
  templateUrl: './prioridade-chip.component.html',
  styleUrls: ['./prioridade-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrioridadeChipComponent implements OnChanges {
  @Input() prioridade!: Prioridade | number;
  prioridadeLabel = '';
  prioridadeClass = '';

  ngOnChanges(): void {
    const resolved = typeof this.prioridade === 'number'
      ? PRIORIDADE_FROM_INDEX[this.prioridade]
      : this.prioridade;

    switch (resolved) {
      case Prioridade.BAIXA:
        this.prioridadeLabel = 'Baixa';
        this.prioridadeClass = 'chip--success';
        break;
      case Prioridade.MEDIA:
        this.prioridadeLabel = 'Media';
        this.prioridadeClass = 'chip--warning';
        break;
      case Prioridade.ALTA:
        this.prioridadeLabel = 'Alta';
        this.prioridadeClass = 'chip--error';
        break;
    }
  }
}
