import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../../models/pessoa';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  pessoaUrl = `${environment.api.baseUrl}/service/pessoa`;

  constructor(private http: HttpClient) {}

  findByEmail(email: string) {
    return this.http.get<Pessoa>(`${this.pessoaUrl}/${email}`);
  }
}
