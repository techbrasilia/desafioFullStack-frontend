import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/api';
  private credentials: string | null = null;  // Armazenar as credenciais codificadas

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  }

  constructor(private http: HttpClient) { }

  // login(username: string, password: string): Observable<any> {
  //   console.log('URL: ', this.apiUrl)

  //   let data = {
  //     'username': username,
  //     'password': password
  //   }
  //   return this.http.post(`${this.apiUrl}/login`, JSON.stringify(data), this.httpOptions);
  // }

  login(username: string, password: string): Observable<any> {
    // Codificar username e password em Base64 para o Basic Auth
    const encodedCredentials = btoa(`${username}:${password}`);
    this.credentials = encodedCredentials;
    console.log('URL: ', this.apiUrl)
    // Fazer a requisição de login (opcional, pode ser utilizado para validar o login na API)
    return this.http.post(`${this.apiUrl}/auth/login`, {}, {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`
      }
    });
  }

  register(nome: string, senha: string, email: string, perfil: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, { nome, senha, email, perfil })
  }

  getCredentials(): string | null {
    return this.credentials;
  }

  logout(): void {
    this.credentials = null;  // Limpar as credenciais quando o usuário fizer logout
  }
}
