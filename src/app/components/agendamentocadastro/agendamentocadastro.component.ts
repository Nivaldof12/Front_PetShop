import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento';
import { PerfilPet } from 'src/app/models/perfilpet';
import { Usuario } from 'src/app/models/usuario';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { AuthService } from 'src/app/services/auth.service';
import { PerfilpetService } from 'src/app/services/perfilpet.service';

@Component({
  selector: 'app-agendamentocadastro',
  templateUrl: './agendamentocadastro.component.html',
  styleUrls: ['./agendamentocadastro.component.css']
})
export class AgendamentocadastroComponent implements OnInit {

  dataAtual = new Date();
  horaMinima = '09:00';
  horaMaxima = '18:00';

  validarDia = new FormControl(null);
  validarObservacao = new FormControl(null);
  validarTipo = new FormControl(null);
  validarPerfilPetId = new FormControl(null);

  agendamento: Agendamento = {
    perfilPet: {
      nome: '',
      raca: '',
      idade: null
    },
    dia: '',
    tipo: '',
    observacao: ''
  };
  perfilPets: PerfilPet[];

  constructor(
    private agendamentoService: AgendamentoService,
    private perfilPetService: PerfilpetService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const usuarioLogado: Usuario = this.authService.getUsuarioLogado();
    if (usuarioLogado) {
      const idUsuario = usuarioLogado.id;
      this.obterPerfilPetsPorUsuario(idUsuario);
    } else {
      console.error('Nenhum usuário logado encontrado');
    }
  }

  // Método para apenas permitir cadastros entre 9:00 e 18:00 horas
  validarHorario(): boolean {
    const horaSelecionada = this.agendamento.observacao;
    return horaSelecionada >= this.horaMinima && horaSelecionada <= this.horaMaxima;
  }

  // Método para obter os perfis de pets do usuário
  obterPerfilPetsPorUsuario(idUsuario: number) {
    this.perfilPetService.obterPerfisPorUsuario(idUsuario).subscribe(
      (perfilPets: PerfilPet[]) => {
        this.perfilPets = perfilPets;
      },
      error => {
        console.error('Erro ao obter perfil de pets:', error);
      }
    );
  }

  // Método para cadastrar um agendamento
  cadastrarAgendamento(): void {

    if (!this.validarHorario()) {
      // Mostrar uma mensagem de erro ao usuário informando que o horário selecionado está fora do intervalo permitido
      this.toastr.error('Por favor, selecione um horário entre 09:00 e 18:00.', 'Erro');
      return;
    }

    this.agendamentoService.incluir(this.agendamento).subscribe(
      response => {
        this.toastr.success('Agendamento cadastrado com sucesso!', 'Sucesso');
        console.log('Agendamento cadastrado com sucesso: ', response);
        // Limpar o formulário após o cadastro
        this.agendamento = {
          perfilPet: {
            nome: '',
            raca: '',
            idade: null
          },
          dia: '',
          tipo: '',
          observacao: ''
        };
        this.router.navigate(['agendamento']);
      },
      error => {
        console.log('Erro ao cadastrar agendamento: ', error);
        if (error.status === 500) {
          this.toastr.error('Já existem 3 agendamentos cadastrados para a mesma hora e dia.', 'Erro');
        } else {
          this.toastr.error('Erro ao cadastrar agendamento. Por favor, tente novamente mais tarde.', 'Erro');
        }
      }
    );
  }

  // Método para validar se todos os campos estão preenchidos
  validaCampos(): boolean {
    return this.validarDia.valid && this.validarObservacao.valid && this.validarTipo.valid && this.validarPerfilPetId.valid;
}
  
  // Método para voltar para a página de agendamentos
  voltar() {
    this.router.navigate(['agendamento'])
  }
}
