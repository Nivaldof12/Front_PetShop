import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  editarUsuario(usuario: Usuario): Observable<string> {
    const url = `${API_CONFIG.baseUrl}/api/usuarios/editar/${usuario.id}`;
    return this.http.put<string>(url, usuario);
  }
}
