import * as fromAuth from "../actions";
import { User } from "../../../../models/user.model";
import { getUserFromStorage } from "./auth-state-local-storage";

export interface AuthState {
    isLoggedIn: boolean;
    user: User;
}

// First, we check if the user is already logged in from the local storage.
const userFromLocalStorage = getUserFromStorage();

export const InitialAuthState: AuthState = {
    isLoggedIn: userFromLocalStorage !== undefined,
    user: userFromLocalStorage ? userFromLocalStorage : null
};

export function authReducer(
    state = InitialAuthState,
    action: fromAuth.AuthAction
): AuthState {
    switch (action.type) {
        case fromAuth.LOGGED_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user
            };
        }

        case fromAuth.LOGGED_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        }

        default: {
            return state;
        }
    }
}

export const getLoggedIn = (state: AuthState) => state.isLoggedIn;
export const getUser = (state: AuthState) => state.user;
