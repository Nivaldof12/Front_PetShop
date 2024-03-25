import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['position', 'name', 'email', 'password', 'celular', 'actions'];
  dataSource = new MatTableDataSource<Usuario>(this.usuarios);
  numeroFuncionarios: number;

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService, private funcionarioService: FuncionarioService) { }

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

  // Método para excluir um usuário
  excluirUsuario(id: number): void {
    // Verifica se o usuário não é o admin
    const usuarioExcluir = this.usuarios.find(usuario => usuario.id === id);
    if (usuarioExcluir?.admin) {
      this.toastr.error('Não é possível excluir o usuário admin.', 'Erro');
      return;
    }

    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.excluirUsuario(id).subscribe(
        () => {
          this.toastr.success('Usuário excluído com sucesso!', 'Sucesso');
          this.listarUsuarios(); // Atualiza a lista após a exclusão
        },
        error => {
          console.error('Erro ao excluir usuário: ', error);
          this.toastr.error('Erro ao excluir usuário. Por favor, tente novamente mais tarde.', 'Erro');
        }
      );
    }
  }

  incluirFuncionario(): void {
    this.funcionarioService.incluir({ numeroFuncionarios: this.numeroFuncionarios }).subscribe(
      response => {
        this.toastr.success('Funcionário(s) incluído(s) com sucesso!', 'Sucesso');
        console.log('Funcionário(s) incluído(s) com sucesso: ', response);
      },
      error => {
        console.log('Erro ao incluir funcionário(s): ', error);
        this.toastr.error('Erro ao incluir funcionário(s). Por favor, tente novamente mais tarde.', 'Erro');
      }
    );
  }
}
