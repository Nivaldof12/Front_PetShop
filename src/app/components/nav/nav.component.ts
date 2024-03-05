import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  usuarioLogado: Usuario;

  constructor(private router: Router,
  private toast: ToastrService,
  private authService: AuthService) { }

  ngOnInit(): void {
    this.router.navigate(['home'])
    this.usuarioLogado = this.authService.getUsuarioLogado();
  }

  logout() {
    this.router.navigate(['login'])
    this.toast.info('Logout realizado!', 'Logout', {timeOut: 7000})
  }
}
