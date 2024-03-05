import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.css']
})
export class PerfilusuarioComponent implements OnInit {

  usuarioLogado: Usuario;

  // Dados para atualização do usuário
  novoNome: string;
  novoEmail: string;
  novaSenha: string;
  novoCelular: string;

  validarnome = new FormControl(null);
  validaremail = new FormControl(null, Validators.email);
  validarsenha = new FormControl(null, Validators.minLength(5));
  validarcelular = new FormControl(null);

  constructor(private authService: AuthService, private usuarioService: UsuarioService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Obter o usuário logado
    this.usuarioLogado = this.authService.getUsuarioLogado();
  }

  // Método para atualizar os dados do usuário
  atualizarUsuario(): void {
    // Criar um objeto com os novos dados do usuário
    const usuarioAtualizado: Usuario = {
      id: this.usuarioLogado.id,
      nome: this.novoNome || this.usuarioLogado.nome,
      email: this.novoEmail || this.usuarioLogado.email,
      senha: this.novaSenha || this.usuarioLogado.senha,
      celular: this.novoCelular || this.usuarioLogado.celular,
      admin: this.usuarioLogado.admin
    };

    // Chamar o serviço para atualizar os dados do usuário
    this.usuarioService.editarUsuario(usuarioAtualizado).subscribe(
      () => {
        // Atualizar os dados do usuário logado após a edição bem-sucedida
        this.usuarioLogado = usuarioAtualizado;
        // Limpar os campos de entrada
        this.novoNome = '';
        this.novoEmail = '';
        this.novaSenha = '';
        this.novoCelular = '';
        // Exibir mensagem de sucesso
        this.toastr.success('Perfil atualizado com sucesso!', 'Sucesso');
      },
      error => {
        console.error('Erro ao atualizar usuário:', error);
        // Exibir mensagem de erro
        this.toastr.error('Erro ao atualizar perfil. Por favor, tente novamente mais tarde.', 'Erro');
      }
    );
  }

  // Método para validar se todos os campos do formulário
  validaCampos(): boolean {
    return this.validarnome.valid && this.validaremail.valid && this.validarsenha.valid && this.validarcelular.valid;
  }
}