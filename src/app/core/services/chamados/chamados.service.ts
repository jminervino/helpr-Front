import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chamado } from '../../models/chamado';

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


  create(chamado: Chamado) {
    return this.http.post(this.chamadosUrl, chamado);
  }

  update(chamado: Chamado) {
    return this.http.put(`${this.chamadosUrl}/${chamado.id}`, chamado);
  }
}
