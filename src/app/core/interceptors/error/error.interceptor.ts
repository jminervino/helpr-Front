import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toast: HotToastService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            // Token inválido ou expirado — limpa sessão e redireciona para login
            localStorage.removeItem('token');
            this.router.navigate(['/auth']);
            this.toast.error('Sessao expirada. Faca login novamente.');
            break;
          case 403:
            if (req.method === 'POST' && req.url.includes('/service/clientes')) {
              this.toast.error('Apenas tecnicos ou administradores podem criar clientes.');
            } else {
              this.toast.error('Acao nao permitida');
            }
            break;
          case 404:
            // Silencioso — recursos não encontrados são tratados por cada serviço
            break;
          case 409:
            this.toast.error(error.error?.message || 'Conflito de dados');
            break;
          case 0:
            this.toast.error('Servidor indisponivel');
            break;
          default:
            this.toast.error(error.error?.message || 'Um erro aconteceu');
            break;
        }

        return throwError(() => error);
      })
    );
  }
}
