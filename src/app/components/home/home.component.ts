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

  perfilpet() {
    this.router.navigate(['perfilpetcadastro'])
  }

  agendamento() {
    this.router.navigate(['agendamentocadastro'])
  }

  perfiluser() {
    this.router.navigate(['perfilusuario'])
  }

}
