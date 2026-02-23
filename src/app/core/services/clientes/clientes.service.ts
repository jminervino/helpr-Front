import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/pessoa';
import { environment } from 'src/environments/environment';

/** Backend espera perfils como number[] (ADMIN=0, CLIENTE=1, TECNICO=2). */
export interface ClienteCreatePayload {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  perfils: number[];
}

export interface ClienteUpdatePayload extends ClienteCreatePayload {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  clientesUrl = `${environment.api.baseUrl}/service/clientes`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clientesUrl);
  }

  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.clientesUrl}/${id}`);
  }

  create(payload: ClienteCreatePayload) {
    return this.http.post<Cliente>(this.clientesUrl, payload);
  }

  update(payload: ClienteUpdatePayload) {
    return this.http.put(`${this.clientesUrl}/${payload.id}`, payload);
  }

  delete(id: number) {
    return this.http.delete(`${this.clientesUrl}/${id}`);
  }
}
