import { NgModule } from '@angular/core';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../shared/material.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { Error404Component } from './404/error-404.component';
import { Error500Component } from './500/error-500.component';

@NgModule({
    imports: [
        AuthenticationRoutingModule,
        MaterialModule
    ],
    declarations: [
        LoginComponent,
        ForgotPasswordComponent,
        ConfirmEmailComponent,
        Error404Component,
        Error500Component
    ],
    providers: [],
})

export class AuthenticationModule {}
