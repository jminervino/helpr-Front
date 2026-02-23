import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Status } from 'src/app/core/models/chamado';

const STATUS_FROM_INDEX: Record<number, Status> = {
  0: Status.ABERTO,
  1: Status.ANDAMENTO,
  2: Status.ENCERRADO,
};

@Component({
  selector: 'app-status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusChipComponent implements OnChanges {
  @Input() status!: Status | number;
  statusLabel = '';
  statusClass = '';

  ngOnChanges(): void {
    const resolved = typeof this.status === 'number'
      ? STATUS_FROM_INDEX[this.status]
      : this.status;

    switch (resolved) {
      case Status.ABERTO:
        this.statusLabel = 'Aberto';
        this.statusClass = 'chip--info';
        break;
      case Status.ANDAMENTO:
        this.statusLabel = 'Andamento';
        this.statusClass = 'chip--warning';
        break;
      case Status.ENCERRADO:
        this.statusLabel = 'Fechado';
        this.statusClass = 'chip--success';
        break;
    }
  }
}
