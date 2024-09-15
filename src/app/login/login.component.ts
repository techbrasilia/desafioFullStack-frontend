import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  localStorage: any = null;
  email: string = '';
  senha: string = '';

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document, private api: ApiService) {
    this.localStorage = document.defaultView?.localStorage;
  }

  onSubmit() {
    this.api.login(this.email, this.senha).subscribe({
      next: (response) => {
        this.localStorage.setItem('usuariolog', btoa(JSON.stringify(response.nome)));
        this.router.navigate(['/consulta']);
      },
      error: (error) => {
        console.log('Login failed:', error);
        this.senha = '';
        if (error.status === 401) {
          alert('Credenciais inválidas');
        } else {
          alert('Ocorreu um erro ao processar o login');
        }
      }
    })
  }
}
