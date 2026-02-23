import { PessoasService } from './../pessoas/pessoas.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
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
    return this.pessoasService.findByEmail(this.emailUser!);
  }

  userRole(): string | null {
    return this.roleUser;
  }

  loadUserRole(): Observable<string | null> {
    // Se o JWT já tem as claims de role, usa direto — sem requisição HTTP
    const jwtRole = this.resolveRoleFromToken();
    if (jwtRole) {
      this.roleSubject.next(jwtRole);
      return of(jwtRole);
    }

    // Fallback: busca na API quando o JWT não traz 'authorities'
    return this.userInfo().pipe(
      map((pessoa) => this.resolveRole((pessoa.perfils ?? []) as string[])),
      tap((role) => this.roleSubject.next(role)),
      catchError(() => of(null))
    );
  }

  /** Extrai o role das claims do JWT (Spring Boot armazena em 'authorities'). */
  private resolveRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = this.jwt.decodeToken(token);
      const raw = decoded.authorities;
      if (!raw) return null;
      const auth = Array.isArray(raw) ? raw.join(',') : String(raw);
      if (auth.includes('ADMIN')) return 'Admin';
      if (auth.includes('TECNICO')) return 'Tecnico';
      if (auth.includes('CLIENTE')) return 'Cliente';
    } catch {
      return null;
    }
    return null;
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
    localStorage.removeItem('token');
    this.roleSubject.next(null);
    this.emailUser = undefined;
  }
}
