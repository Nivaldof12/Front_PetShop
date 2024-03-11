import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource = new MatTableDataSource<Usuario>(this.usuarios);

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  // Método para listar os usuários
  listarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(
      response => {
        this.usuarios = response;
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      },
      error => {
        console.error('Erro ao obter lista de usuários: ', error);
      }
    );
  }

  // método do filtro da tabela
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
