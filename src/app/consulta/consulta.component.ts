import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent {

  isPodeEditar = false;
  localStorage: any = null;
  usuario = {
    id: '',
    nome: '',
    email: '',
    senha: '',

  }

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document, private api: ApiService) {
    this.localStorage = document.defaultView?.localStorage;

    if (this.localStorage) {
      const teste = this.localStorage?.getItem(this.api.tokenKey);
      console.log('t:', teste)
      if (!teste) {
        this.router.navigate(['/']);
      }
    }

  }

  onSubmit() {
    this.isPodeEditar = false;
    this.api.getUser(Number(this.usuario.id)).subscribe({
      next: (response) => {
        console.log('res: ', response);
        this.usuario.id = response.id;
        this.usuario.nome = response.nome;
        this.usuario.email = response.email;
        this.isPodeEditar = true;
      },
      error: (error) => {
        console.log('Falha na consulta:', error);
        this.isPodeEditar = false;
        if (error.status === 403) {
          alert('Sem permissao para consultar esse usuario.');
        } else if (error.status === 404) {
          alert('Nenhum usuario encontrado.');
        } else {
          alert('Erro ao consultar dados');
        }
      }
    })
  }

  handleEdit() {
    this.api.update(Number(this.usuario.id), this.usuario.nome, this.usuario.email).subscribe({
      next: (response) => {
        this.localStorage.setItem('usuariolog', btoa(JSON.stringify(response.nome)));
      },
      error: (error) => {
        console.log('Falha na consulta:', error);
        this.isPodeEditar = false;
        if (error.status === 403) {
          alert('Sem permissao para consultar esse usuario.');
        } else if (error.status === 404) {
          alert('Nenhum usuario encontrado.');
        } else {
          alert('Erro ao consultar dados');
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

}
