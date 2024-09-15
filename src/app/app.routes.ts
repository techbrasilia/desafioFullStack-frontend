import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { CadastroComponent } from './cadastro/cadastro.component';

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
        path: 'cadastro',
        component: CadastroComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
