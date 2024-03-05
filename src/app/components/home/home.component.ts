import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Método para ir para a página de perfilpetcadastro
  perfilpet() {
    this.router.navigate(['perfilpetcadastro'])
  }

  // Método para ir para a página de agendamentocadastro
  agendamento() {
    this.router.navigate(['agendamentocadastro'])
  }

  // Método para ir para a página de perfilusuario
  perfiluser() {
    this.router.navigate(['perfilusuario'])
  }

}
