import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { response } from 'express';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private router: Router, private api: ApiService) { }

  onSubmit() {
    // Aqui você faria a chamada à API para autenticação
    this.api.login(this.email, this.senha).subscribe({
      next: (response) => {
        console.log('res: ', response)
      },
      error: (error) => {
        console.log('Login failed:', error);
        // Verifique o conteúdo do erro retornado
        if (error.status === 401) {
          alert('Credenciais inválidas');
        } else {
          alert('Ocorreu um erro ao processar o login');
        }
      }
    })


    // Redirecionar para outra página em caso de sucesso
    this.router.navigate(['/register']);
  }
}
