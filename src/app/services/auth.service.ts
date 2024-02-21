import { Injectable } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais): Observable<boolean> {
    return this.http.post(`${API_CONFIG.baseUrl}/api/usuarios/autenticar`, creds, { observe: 'response' })
      .pipe(
        map(response => {
          // Se a resposta tiver o status 200 (OK), as credenciais são válidas
          this.isAuthenticated = response.status === 200;
          return this.isAuthenticated;
        })
      );
  }

  // Método para verificar se o usuário está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
