import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecnico } from '../../models/pessoa';

/** Backend espera perfils como number[] (ADMIN=0, CLIENTE=1, TECNICO=2). */
export interface TecnicoPayload {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  perfils: number[];
}

@Injectable({
  providedIn: 'root',
})
export class TecnicosService {
  tecnicosUrl = `${environment.api.baseUrl}/service/tecnicos`;
  constructor(private http: HttpClient) {}

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(this.tecnicosUrl);
  }

  findById(id: number): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${this.tecnicosUrl}/${id}`);
  }

  create(payload: Omit<TecnicoPayload, 'id'>) {
    return this.http.post<Tecnico>(this.tecnicosUrl, payload);
  }

  update(payload: TecnicoPayload) {
    return this.http.put<Tecnico>(`${this.tecnicosUrl}/${payload.id}`, payload);
  }

  delete(id: number) {
    return this.http.delete(`${this.tecnicosUrl}/${id}`);
  }
}
