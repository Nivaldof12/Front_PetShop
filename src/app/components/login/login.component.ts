import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(5));

  constructor(
    private toast:ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logar() {
    this.service.authenticate(this.creds).subscribe(
      resposta => {
        // Tratar resposta de sucesso aqui
        this.toast.success('Login realizado com sucesso!');
        this.router.navigate(['home']);
      },
      erro => {
        // Tratar erro de autenticação aqui
        if (erro.status === 401) {
          this.toast.error('Credenciais inválidas. Por favor, verifique seu login e senha.');
        } else {
          this.toast.error('Ocorreu um erro durante a autenticação. Por favor, tente novamente mais tarde.');
        }
      }
    );
  }
  
  

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}
