import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConsultaComponent } from './consulta/consulta.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'consulta',
        component: ConsultaComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
