import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toast: HotToastService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 403:
            this.toast.error('Acao nao permitida');
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
