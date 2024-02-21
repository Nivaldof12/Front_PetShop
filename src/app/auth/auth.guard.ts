import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verificar se o usuário está autenticado
    if (this.authService.isLoggedIn()) {
      return true; // Permitir o acesso à rota protegida
    } else {
      // Redirecionar para a página de login se o usuário não estiver autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
