import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  agendamentos: Agendamento[] = [];
  usuarioLogado: any;

  constructor(private agendamentoService: AgendamentoService, private toastr: ToastrService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.obterTodosAgendamentos();
    this.usuarioLogado = this.authService.getUsuarioLogado();
  }

  // Método para listar todos os agendamentos
  obterTodosAgendamentos() {
    this.agendamentoService.obterTodosAgendamentos().subscribe(
      (agendamentos: Agendamento[]) => {
        this.agendamentos = agendamentos;
      },
      error => {
        console.error('Erro ao obter agendamentos:', error);
        this.toastr.error('Erro ao obter agendamentos. Por favor, tente novamente mais tarde.', 'Erro');
      }
    );
  }

  // Método para excluir um agendamento
  excluirAgendamento(id: number) {
    this.agendamentoService.excluirAgendamento(id).subscribe(
      () => {
        this.toastr.success('Agendamento excluído com sucesso!', 'Sucesso');
        // Atualizar a lista de agendamentos após excluir
        this.obterTodosAgendamentos();
      },
      error => {
        console.error('Erro ao excluir agendamento:', error);
        this.toastr.error('Erro ao excluir agendamento. Por favor, tente novamente mais tarde.', 'Erro');
      }
    );
  }
  
  // Método para redirecionar para a página de cadastro de agendamento
  cadastroagendamento() {
    this.router.navigate(['agendamentocadastro'])
  }
}
