import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { PerfilpetService } from 'src/app/services/perfilpet.service';

@Component({
  selector: 'app-perfilpetcadastro',
  templateUrl: './perfilpetcadastro.component.html',
  styleUrls: ['./perfilpetcadastro.component.css']
})
export class PerfilpetcadastroComponent implements OnInit {

  perfilPetForm: FormGroup;

  validarnome = new FormControl(null);
  validarraca = new FormControl(null);
  validaridade = new FormControl(null, [Validators.pattern('^[0-9]*$')]);

  nome: string;
  raca: string;
  idade: number;
  
  constructor(
    private perfilPetService: PerfilpetService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.perfilPetForm = new FormGroup({
      nome: this.validarnome,
      raca: this.validarraca,
      idade: this.validaridade
    });
  }

  // Método para incluir um novo perfil de pet
  incluirPerfilPet(): void {
    if (this.perfilPetForm.valid) {
      const idUsuario = this.authService.getUsuarioLogado().id;
      const perfilPet = this.perfilPetForm.value;
      perfilPet.usuario = { id: idUsuario };
      this.perfilPetService.incluir(perfilPet).subscribe(
        () => {
          this.toastr.success('Perfil do pet incluído com sucesso!', 'Sucesso');
          this.router.navigate(['perfilpet']);
        },
        error => {
          this.toastr.error('Por favor, preencha todos os campos corretamente.', 'Erro');
        }
      );
    } else {
      Object.keys(this.perfilPetForm.controls).forEach(field => {
        const control = this.perfilPetForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  // Método para validar se todos os campos do formulário
  validaCampos(): boolean {
    return this.validarnome.valid && this.validarraca.valid && this.validaridade.valid;
  }

  // Método para navegar de volta para a página de perfis de pet
  voltar() {
    this.router.navigate(['perfilpet'])
  }
}
