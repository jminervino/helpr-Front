import { PessoasService } from './../pessoas/pessoas.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private pessoasService: PessoasService) {}

  emailUser?: string;
  roleUser?: string;

  login(email: string, senha: string) {
    const creds = { email, senha };
    return this.http.post(`${environment.api.baseUrl}/login`, creds, {
      responseType: 'text',
      observe: 'response',
    });
  }

  userInfo() {
    let token = localStorage.getItem('token');

    if (token !== null) {
      const decoded = this.jwt.decodeToken(token);
      this.emailUser = decoded.sub;
    }

    return this.pessoasService.findByEmail(this.emailUser!).pipe(retry(5));
  }

  userRole() {
    this.userInfo().subscribe((has) => {
      let array: any[] = [];
        array = has.perfils;
          if (array.includes('ADMIN') && array.includes('TECNICO') && array.includes('CLIENTE')) {
            return this.roleUser = 'Admin';
          } else if(array.includes('ADMIN') && array.includes('TECNICO')) {
            return this.roleUser = 'Admin';
          } else if(array.includes('ADMIN') && array.includes('CLIENTE')) {
            return this.roleUser = 'Admin';
          } else if (array.includes('TECNICO')) {
            return this.roleUser = 'Técnico';
          } else if (array.includes('TECNICO') && array.includes('CLIENTE')) {
            return this.roleUser = 'Técnico';
          } else if (array.includes('CLIENTE')) {
            return this.roleUser = 'Cliente';
          } else {
            return null;
          }
        });
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
  }

  onLogout() {
    localStorage.clear();
  }
}
