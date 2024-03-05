import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Agendamento } from 'src/app/models/agendamento';
import { PerfilPet } from 'src/app/models/perfilpet';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { PerfilpetService } from 'src/app/services/perfilpet.service';

@Component({
  selector: 'app-agendamentocadastro',
  templateUrl: './agendamentocadastro.component.html',
  styleUrls: ['./agendamentocadastro.component.css']
})
export class AgendamentocadastroComponent implements OnInit {

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

  constructor(private agendamentoService: AgendamentoService, private perfilPetService: PerfilpetService, private router: Router) { }

  ngOnInit(): void {
    this.carregarPerfilPets();
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
      },
      error => {
        console.log('Erro ao cadastrar agendamento: ', error);
      }
    );
  }
  
  voltar() {
    this.router.navigate(['agendamento'])
  }
}
