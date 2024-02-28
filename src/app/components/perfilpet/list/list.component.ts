import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PerfilPet } from 'src/app/models/perfilpet';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  ELEMENT_DATA: PerfilPet[] = [
    {
      id: 1,
      nome: 'nego',
      raca: 'shih tzu',
      idade: 7

    }
  ]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<PerfilPet>(this.ELEMENT_DATA);

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  perfilpetcadastro() {
    this.router.navigate(['perfilpetcadastro'])
  }

}