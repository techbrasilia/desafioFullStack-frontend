import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../model/Perfil';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/api';
  private credentials: string | null = null;  // Armazenar as credenciais codificadas
  public tokenKey = 'authToken';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const encodedCredentials = btoa(`${username}:${password}`);
    this.credentials = encodedCredentials;
    localStorage.setItem(this.tokenKey, String(this.credentials));
    return this.http.post(`${this.apiUrl}/auth/login`, {}, {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`
      }
    });
  }

  register(nome: string, email: string, senha: string, perfil: Perfil): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, { nome, email, senha, perfil }, {
      headers: {
        'Authorization': `Basic ${this.getCredentials()}`
      }
    })
  }

  update(id: number, nome: string, email: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, { nome, email }, {
      headers: {
        'Authorization': `Basic ${this.getCredentials()}`
      }
    })
  }

  getUser(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/${email}`, {
      headers: {
        'Authorization': `Basic ${this.getCredentials()}`
      }
    });
  }

  getCredentials(): string | null {
    return this.credentials || localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    console.log('teste 1')
    this.http.post(`${this.apiUrl}/auth/logout`, {}, {
      headers: {
        'Authorization': `Basic ${this.getCredentials()}`
      }
    }).pipe().subscribe(r => {
      console.log('teste 2')
      localStorage.clear();
    });
  }
}
