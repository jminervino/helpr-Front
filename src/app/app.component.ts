import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    public router: Router,
    public titleService: Title,
    private authService: AuthService,
  ) {
    if (authService.isAuthenticated) {
      authService.loadUserRole().subscribe();
    }

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd | any) => {
        switch (event.url) {
          case '/home':
            titleService.setTitle('Home');
            break;
          case '/chamados':
            titleService.setTitle('Lista de chamados');
            break;
          case '/chamados/new':
            titleService.setTitle('Novo chamado');
            break;
          case '/clientes':
            titleService.setTitle('Lista de clientes');
            break;
          case '/clientes/new':
            titleService.setTitle('Novo cliente');
            break;
          case '/tecnicos':
            titleService.setTitle('Lista de técnicos');
            break;
          case '/tecnicos/new':
            titleService.setTitle('Novo técnico');
            break;
          default:
            titleService.setTitle('Helpr');
            break;
        }
      });
  }
}

