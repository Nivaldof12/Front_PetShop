import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PerfilpetService } from 'src/app/services/perfilpet.service';

@Component({
  selector: 'app-perfilpeteditar',
  templateUrl: './perfilpeteditar.component.html',
  styleUrls: ['./perfilpeteditar.component.css']
})
export class PerfilpeteditarComponent implements OnInit {

  nome: string;
  raca: string;
  idade: number;

  validarnome = new FormControl(null);
  validarraca = new FormControl(null);
  validaridade = new FormControl(null);

  constructor(private perfilPetService: PerfilpetService, private router: Router, private route: ActivatedRoute, private toast: ToastrService) { }

  ngOnInit(): void {
    const idPerfilPet = this.getIdPerfilPet();
    // Aqui você pode chamar um método para carregar os dados do perfil do pet com base no ID
  }

  // Método para obter o ID do perfil de pet da rota
  getIdPerfilPet(): number {
    return +this.route.snapshot.params['id'];
  }

  // Método para validar se todos os campos do formulário
  validaCampos(): boolean {
    return this.validarnome.valid && this.validarraca.valid && this.validaridade.valid;
  }

  // Método para editar o perfil de pet
  EditarPerfilPet(): void {
    const idPerfilPet = this.getIdPerfilPet();
    const perfilPetAlterado = {
      nome: this.nome,
      raca: this.raca,
      idade: this.idade
    };
    this.perfilPetService.editar(idPerfilPet, perfilPetAlterado).subscribe(
      () => {
        this.toast.success('Perfil do pet editado com sucesso!');
        this.router.navigate(['perfilpet'])
      },
      error => {
        this.toast.error('Erro ao editar perfil do pet.');
        // Tratar erro aqui, como exibir uma mensagem de erro para o usuário
      }
    );
  }

  // Método para navegar de volta para a página de perfis de pet
  voltar() {
    this.router.navigate(['perfilpet'])
  }

}
