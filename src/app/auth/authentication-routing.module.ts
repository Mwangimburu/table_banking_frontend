import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { Error404Component } from './404/error-404.component';
import { Error500Component } from './500/error-500.component';

export const AuthenticationRoutes: Routes = [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'forgot-password', component: ForgotPasswordComponent },
        { path: 'confirm-email', component: ConfirmEmailComponent },
        { path: '404', component: Error404Component },
        { path: '500', component: Error500Component },
];

export const AuthenticationRoutingModule = RouterModule.forChild(AuthenticationRoutes);
