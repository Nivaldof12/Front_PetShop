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
    this.carregarPerfilPets();
    const usuarioLogado: Usuario = this.authService.getUsuarioLogado();
    if (usuarioLogado) {
      const idUsuario = usuarioLogado.id;
      this.obterPerfilPetsPorUsuario(idUsuario);
    } else {
      console.error('Nenhum usuário logado encontrado');
    }
  }

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

  carregarPerfilPets(): void {
    this.perfilPetService.listar().subscribe(
      response => {
        this.perfilPets = response;
      },
      error => {
        console.log('Erro ao carregar perfis de pets: ', error);
      }
    );
  }

  cadastrarAgendamento(): void {
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
        this.toastr.error('Erro ao cadastrar agendamento. Por favor, tente novamente mais tarde.', 'Erro');
      }
    );
  }

  validaCampos(): boolean {
    return this.validarDia.valid && this.validarObservacao.valid && this.validarTipo.valid && this.validarPerfilPetId.valid;
}
  
  voltar() {
    this.router.navigate(['agendamento'])
  }
}
