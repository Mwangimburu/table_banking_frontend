import { Action } from '@ngrx/store';
import { User } from './model/user.model';

export enum AuthActionTypes {
  LoginAction = '[Login] Login Action',
  LogoutAction = '[Logout] Logout Action',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: {user: User}) {
    console.log('...at login action...');
    console.log(payload);
    console.log('...');
  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}


export type AuthActions = Login | Logout;
