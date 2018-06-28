import * as fromAuth from '../actions';
import { User } from "../../../../models/user.model";

export interface AuthState {
    isLoggedIn: boolean;
    user: User;
}

export const InitialAuthState: AuthState = {
    isLoggedIn: false,
    user: null
};

export function authReducer(state = InitialAuthState, action: fromAuth.AuthAction): AuthState {
    switch (action.type) {
      case fromAuth.LOGGED_IN: {
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload.user
        };
      }

      case fromAuth.LOGGED_OUT: {
        return InitialAuthState;
      }

      default: {
        return state;
      }
    }
  }

  export const getLoggedIn = (state: AuthState) => state.isLoggedIn;
  export const getUser = (state: AuthState) => state.user;
