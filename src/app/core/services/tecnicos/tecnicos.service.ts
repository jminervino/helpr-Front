import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecnico } from '../../models/pessoa';

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

  create(tecnico: Tecnico) {
    return this.http.post(this.tecnicosUrl, tecnico);
  }

  update(tecnico: Tecnico) {
    return this.http.put(`${this.tecnicosUrl}/${tecnico.id}`, tecnico);
  }

  delete(id: number) {
    return this.http.delete(`${this.tecnicosUrl}/${id}`);
  }
}
