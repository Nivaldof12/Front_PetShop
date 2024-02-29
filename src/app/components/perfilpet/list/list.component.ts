import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PerfilPet } from 'src/app/models/perfilpet';
import { AuthService } from 'src/app/services/auth.service';
import { PerfilpetService } from 'src/app/services/perfilpet.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private authService: AuthService, private perfilpetService: PerfilpetService, private router: Router) {}

  ngOnInit() {
    this.carregarPerfisPet();
  }

  carregarPerfisPet() {
    // Obtenha o usuário logado
    const usuarioLogado = this.authService.getUsuarioLogado();
    // Verifique se o usuário está autenticado
    if (usuarioLogado) {
      const userId = usuarioLogado.id; // Obtenha o ID do usuário logado
      // Chame o serviço para obter os perfis de pet do usuário
      this.perfilpetService.obterPerfisPorUsuario(userId).subscribe(
        (data) => {
          this.dataSource.data = data;
        },
        (error) => {
          console.error('Erro ao carregar perfis de pet:', error);
        }
      );
    } else {
      console.error('Usuário não autenticado');
    }
  }

  excluirPerfilPet(id: number) {
    if (confirm('Tem certeza que deseja excluir este perfil?')) {
      this.perfilpetService.excluir(id).subscribe(
        () => {
          console.log('Perfil de pet excluído com sucesso');
          this.carregarPerfisPet(); // Recarrega os perfis de pet após a exclusão
        },
        (error) => {
          console.error('Erro ao excluir perfil de pet:', error);
        }
      );
    }
  }

  editarPerfilPet(id: number) {
    this.router.navigate(['perfilpeteditar', id]);
  }

  perfilpetcadastro() {
    this.router.navigate(['perfilpetcadastro'])
  }

}