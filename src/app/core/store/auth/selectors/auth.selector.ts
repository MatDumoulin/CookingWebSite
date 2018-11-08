import { createSelector } from "@ngrx/store";

import { DataState, getDataState } from "../../store-state";
import * as fromAuth from "../reducers/auth.reducer";

export const getAuthState = createSelector(
    getDataState,
    (state: DataState) => state.auth
);

export const getLoggedIn = createSelector(
    getAuthState,
    fromAuth.getLoggedIn
);

export const getUser = createSelector(
    getAuthState,
    fromAuth.getUser
);
