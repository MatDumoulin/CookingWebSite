import { Action } from '@ngrx/store';

export const LOGGED_IN = '[Auth] User is logged in';
export const LOG_OUT = '[Auth] User wants to log out';
export const LOGGED_OUT = '[Auth] User is logged out';

export class LoggedIn implements Action {
    readonly type = LOGGED_IN;

    constructor(public payload: any) {}
}

export class LogOut implements Action {
    readonly type = LOG_OUT;
}

export class LoggedOut implements Action {
    readonly type = LOGGED_OUT;
}

// Action types
export type AuthAction = LoggedIn | LogOut | LoggedOut;
