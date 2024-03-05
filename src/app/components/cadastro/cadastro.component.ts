import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NovoUsuario } from 'src/app/models/novousuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  nome: string;
  email: string;
  senha: string;
  celular: string;

  validarnome = new FormControl(null);
  validaremail = new FormControl(null, Validators.email);
  validarsenha = new FormControl(null, Validators.minLength(5));
  validarcelular = new FormControl(null);

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  }

  // Método para cadastrar um usuário
  cadastrarUsuario() {
    const novoUsuario: NovoUsuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      celular: this.celular,
      admin: false
    };

    // Chamar o serviço para cadastrar o usuário
    this.usuarioService.cadastrar(novoUsuario).subscribe(
      () => {
        // Cadastro bem-sucedido, redirecionar para a página de login
        this.toastr.success('Usuário cadastrado com sucesso!', 'Sucesso');
        this.router.navigate(['login']);
      },
      error => {
        // Tratar erro de cadastro
        console.error('Erro ao cadastrar usuário:', error);
        this.toastr.error('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.', 'Erro');
      }
    );
  }

  // Método para voltar para a página de login
  voltar() {
    this.router.navigate(['login'])
  }

  // Método para validar se todos os campos do formulário
  validaCampos(): boolean {
    return this.validarnome.valid && this.validaremail.valid && this.validarsenha.valid && this.validarcelular.valid;
  }
}
