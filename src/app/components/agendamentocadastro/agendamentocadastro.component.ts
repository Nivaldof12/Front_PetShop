import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-agendamentocadastro',
  templateUrl: './agendamentocadastro.component.html',
  styleUrls: ['./agendamentocadastro.component.css']
})
export class AgendamentocadastroComponent implements OnInit {

  // Propriedades do agendamento
  dia: Date;
  observacao: string;
  tipo: string;

  // FormControl para validação
  validarDia = new FormControl(null);
  validarObservacao = new FormControl(null);
  validarTipo = new FormControl(null);

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  // Método para criar um novo agendamento
  criarAgendamento() {
    const novoAgendamento: Agendamento = {
      dia: this.dia,
      observacao: this.observacao,
      tipo: this.tipo
    };

    // Chamar o serviço para cadastrar o agendamento
    this.agendamentoService.criarAgendamento(novoAgendamento).subscribe(
      () => {
        // Cadastro bem-sucedido, redirecionar para alguma página
        this.toastr.success('Agendamento criado com sucesso!', 'Sucesso');
        // Redirecionar para alguma página após o cadastro (exemplo: página inicial)
        this.router.navigate(['agendamento']);
      },
      error => {
        // Tratar erro de cadastro
        console.error('Erro ao criar agendamento:', error);
        this.toastr.error('Erro ao criar agendamento. Por favor, tente novamente mais tarde.', 'Erro');
      }
    );
  }

  // Método para validar os campos do formulário
  validaCampos(): boolean {
    return this.validarDia.valid && this.validarObservacao.valid && this.validarTipo.valid;
  }
  
  voltar() {
    this.router.navigate(['agendamento'])
  }
}
