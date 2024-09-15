import { Component, Inject } from '@angular/core';
import { IUsuario } from '../model/IUsuario';
import { Usuario } from '../model/Usuario';
import { Router } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { IPerfil } from '../model/IPerfil';
import { Perfil } from '../model/Perfil';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  localStorage: any = null;
  usuario: IUsuario | any = new Usuario();

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document, private api: ApiService) {
    this.localStorage = document.defaultView?.localStorage;

    if (this.localStorage) {
      const usuarioSessao = this.localStorage?.getItem(this.api.tokenKey);
      if (!usuarioSessao) {
        this.router.navigate(['/']);
      }
    }

  }

  onSubmit() {
    let perfil: IPerfil = new Perfil();
    perfil.id = this.usuario.perfil;

    this.api.register(this.usuario.nome, this.usuario.email, this.usuario.senha, perfil).subscribe({
      next: (response) => {
        this.clearUser();
      },
      error: (error) => {
        if (error.status === 403) {
          alert('Sem permissao para cadadastrar usuario.');
        } else {
          alert('Erro ao cadastrar');
        }
      }
    })
  }

  getUserLog(): any {
    return this.localStorage?.getItem('usuariolog')
      ? JSON.parse(atob(this.localStorage?.getItem('usuariolog')))
      : null;
  }

  logout() {
    this.api.logout();
    this.router.navigate(['/']);
  }

  clearUser() {
    this.usuario = new Usuario();
  }

  newUser() {
    this.router.navigate(['/cadastro']);
  }

}
