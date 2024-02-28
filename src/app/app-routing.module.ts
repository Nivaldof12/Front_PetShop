import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/perfilpet/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  {
    path:'', component: NavComponent, canActivate: [AuthGuard], children: [
      {path: 'home', component: HomeComponent},
      {path: 'perfilpet', component: ListComponent},
      {path: 'perfilusuario', component: PerfilusuarioComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
