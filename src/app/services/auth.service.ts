import { Injectable } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioLogado: Usuario;

  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient) { }

  // Método para autenticar o usuário e armazenar o usuário logado
  authenticate(creds: Credenciais): Observable<boolean> {
    return this.http.post(`${API_CONFIG.baseUrl}/api/usuarios/autenticar`, creds, { observe: 'response' })
      .pipe(
        map(response => {
          // Se a resposta tiver o status 200 (OK), as credenciais são válidas
          const usuarioLogado = response.body as Usuario;
          this.usuarioLogado = usuarioLogado; // Armazenar o usuário logado
          return response.status === 200;
        })
      );
  }

  // Método para verificar se o usuário está autenticado
  isLoggedIn(): boolean {
    return this.usuarioLogado != null;
  }

  // Método para recuperar o usuário logado
  getUsuarioLogado(): Usuario {
    return this.usuarioLogado;
  }
}
