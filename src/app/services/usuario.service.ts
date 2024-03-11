import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { NovoUsuario } from '../models/novousuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  editarUsuario(usuario: Usuario): Observable<string> {
    const url = `${API_CONFIG.baseUrl}/api/usuarios/editar/${usuario.id}`;
    return this.http.put<string>(url, usuario);
  }

  cadastrar(novousuario: NovoUsuario): Observable<NovoUsuario> {
    return this.http.post<NovoUsuario>(`${API_CONFIG.baseUrl}/api/usuarios/incluir`, novousuario);
  }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_CONFIG.baseUrl}/api/usuarios`);
  }

  excluirUsuario(id: number): Observable<void> {
    const url = `${API_CONFIG.baseUrl}/api/usuarios/${id}`;
    return this.http.delete<void>(url);
  }
  
}
