import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HttpInterceptor } from './interceptors/http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
