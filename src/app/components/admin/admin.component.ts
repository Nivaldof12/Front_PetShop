import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['position', 'name', 'email', 'password', 'celular'];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(
      response => {
        this.usuarios = response;
      },
      error => {
        console.error('Erro ao obter lista de usuários: ', error);
      }
    );
  }

}
