import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(private authService: ApiService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const credentials = this.authService.getCredentials();

    if (credentials) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Basic ${credentials}`)
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }

};
