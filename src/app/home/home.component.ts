import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../core/services/auth/auth.service';
import { ChamadosService } from '../core/services/chamados/chamados.service';
import { Chamado, Status } from '../core/models/chamado';

function isStatus(c: Chamado, status: Status): boolean {
  return c.status === status || c.status === (Object.values(Status).indexOf(status) as unknown as Status);
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  chamados$: Observable<Chamado[]> = this.chamadosService.findAll();

  stats$ = this.chamados$.pipe(
    map((list) => ({
      total: list.length,
      abertos: list.filter((c) => isStatus(c, Status.ABERTO)).length,
      andamento: list.filter((c) => isStatus(c, Status.ANDAMENTO)).length,
      encerrados: list.filter((c) => isStatus(c, Status.ENCERRADO)).length,
    }))
  );

  quickActions = [
    { label: 'Novo Chamado', icon: 'post_add', route: '/chamados/new', color: 'primary' },
    { label: 'Novo Cliente', icon: 'person_add', route: '/clientes/new', color: 'info' },
    { label: 'Novo Tecnico', icon: 'engineering', route: '/tecnicos/new', color: 'accent' },
    { label: 'Manual', icon: 'menu_book', route: '/manual-do-software', color: 'neutral' },
  ];

  constructor(
    private chamadosService: ChamadosService,
    public authService: AuthService,
  ) {}
}
