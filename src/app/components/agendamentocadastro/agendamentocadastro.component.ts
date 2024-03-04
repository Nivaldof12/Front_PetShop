import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  // Propriedades do agendamento
  dia: Date;
  observacao: string;
  tipo: string;
  perfilPets: PerfilPet[] = [];
  perfilPetId: number;

  // FormControl para validação
  validarDia = new FormControl(null);
  validarObservacao = new FormControl(null);
  validarTipo = new FormControl(null);
  validarPerfilPetId = new FormControl(null);

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router,
    private toastr: ToastrService,
    private perfilPetService: PerfilpetService,
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

  // Método para criar um novo agendamento
  criarAgendamento() {
    const novoAgendamento: Agendamento = {
      dia: this.dia,
      observacao: this.observacao,
      tipo: this.tipo,
      perfilPetId: this.perfilPetId
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
    return this.validarDia.valid && this.validarObservacao.valid && this.validarTipo.valid && this.validarPerfilPetId.valid;
  }
  
  voltar() {
    this.router.navigate(['agendamento'])
  }
}
