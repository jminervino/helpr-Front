import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/core/models/chamado';

@Component({
  selector: 'app-status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusChipComponent implements OnInit {
  @Input() status!: Status;
  statusLabel: string = '';
  statusClass: string = '';
  constructor() {}

  ngOnInit(): void {
    switch (this.status) {
      case Status.ABERTO:
        this.statusLabel = 'Aberto';
        this.statusClass = 'baixa';
        break;
      case Status.ANDAMENTO:
        this.statusLabel = 'Andamento';
        this.statusClass = 'media';
        break;
      case Status.ENCERRADO:
        this.statusLabel = 'Fechado';
        this.statusClass = 'alta';
    }
  }
}
