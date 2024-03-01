import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../models/agendamento';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private http: HttpClient) { }

  criarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(`${API_CONFIG.baseUrl}/api/agendamentos/incluir`, agendamento);
  }

  obterTodosAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${API_CONFIG.baseUrl}/api/agendamentos/todos`);
  }

  excluirAgendamento(id: number): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.baseUrl}/api/agendamentos/${id}`);
  }
}
