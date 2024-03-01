import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cadastroagendamento() {
    this.router.navigate(['agendamentocadastro'])
  }
}
