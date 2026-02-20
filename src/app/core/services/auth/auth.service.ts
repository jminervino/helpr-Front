import { PessoasService } from './../pessoas/pessoas.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable, retry, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private pessoasService: PessoasService) {}

  emailUser?: string;
  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();

  get roleUser(): string | null {
    return this.roleSubject.getValue();
  }

  login(email: string, senha: string) {
    const creds = { email, senha };
    return this.http.post(`${environment.api.baseUrl}/login`, creds, {
      responseType: 'text',
      observe: 'response',
    });
  }

  userInfo() {
    this.setEmailFromToken();

    return this.pessoasService.findByEmail(this.emailUser!).pipe(retry(5));
  }

  userRole(): string | null {
    return this.roleUser;
  }

  loadUserRole(): Observable<string | null> {
    return this.userInfo().pipe(
      map((pessoa) => this.resolveRole((pessoa.perfils ?? []) as string[])),
      tap((role) => this.roleSubject.next(role))
    );
  }

  private resolveRole(perfils: string[]): string {
    if (perfils.includes('ADMIN')) return 'Admin';
    if (perfils.includes('TECNICO')) return 'Tecnico';
    if (perfils.includes('CLIENTE')) return 'Cliente';
    return 'Desconhecido';
  }

  private setEmailFromToken(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decoded = this.jwt.decodeToken(token);
      this.emailUser = decoded.sub;
    }
  }

  jwt = new JwtHelperService();

  get isAuthenticated(): boolean {
    let token = localStorage.getItem('token');

    if (token !== null) {
      const decoded = this.jwt.decodeToken(token);
      this.emailUser = decoded.sub;
      return !this.jwt.isTokenExpired(token);
    }

    return false;
  }

  getTokenExpirationDate() {
    let token = localStorage.getItem('token');

    if (token !== null){
      return this.jwt.getTokenExpirationDate(token);
    }

    return null;

  }

  onLogin(token: string) {
    localStorage.setItem('token', token);
    this.setEmailFromToken();
  }

  onLogout() {
    localStorage.clear();
    this.roleSubject.next(null);
    this.emailUser = undefined;
  }
}
