import { Injectable } from '@angular/core';
import { PerfilPet } from '../models/perfilpet';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilpetService {

  constructor(private http: HttpClient) { }

  incluir(perfilPet: PerfilPet): Observable<PerfilPet> {
    return this.http.post<PerfilPet>(`${API_CONFIG.baseUrl}/api/perfilpet/incluir`, perfilPet);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.baseUrl}/api/perfilpet/${id}`);
  }

  obterPerfisPorUsuario(idUsuario: number): Observable<PerfilPet[]> {
    return this.http.get<PerfilPet[]>(`${API_CONFIG.baseUrl}/api/perfilpet/usuario/${idUsuario}`);
  }

  editar(id: number, perfilPetAlterado: PerfilPet): Observable<PerfilPet> {
    return this.http.put<PerfilPet>(`${API_CONFIG.baseUrl}/api/perfilpet/editar/${id}`, perfilPetAlterado);
  }

  listar(): Observable<PerfilPet[]> {
    return this.http.get<PerfilPet[]>(`${API_CONFIG.baseUrl}/api/perfilpet`);
  }
}
