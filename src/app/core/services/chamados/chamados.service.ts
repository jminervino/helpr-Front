import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chamado } from '../../models/chamado';

/** Backend espera prioridade/status como Integer (ordinal do enum Java). */
interface ChamadoCreatePayload {
  prioridade: number;
  status: number;
  titulo: string;
  observacoes: string;
  tecnico: number;
  cliente: number;
}

interface ChamadoUpdatePayload extends ChamadoCreatePayload {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChamadosService {
  chamadosUrl = `${environment.api.baseUrl}/service/chamados`;
  chamadosRelatorio = `${this.chamadosUrl}/relatorios`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.chamadosUrl);
  }

  findById(id: number): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.chamadosUrl}/${id}`);
  }
  findReportChamadoCliente(id: number){
    return this.http.get<Chamado[]>(`${this.chamadosRelatorio}/cliente/${id}`)
      }


  create(chamado: ChamadoCreatePayload) {
    return this.http.post(this.chamadosUrl, chamado);
  }

  update(chamado: ChamadoUpdatePayload) {
    return this.http.put(`${this.chamadosUrl}/${chamado.id}`, chamado);
  }
}
