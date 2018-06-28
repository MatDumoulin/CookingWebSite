import { createSelector } from "@ngrx/store";

import * as fromFeatures from "../../store-state";
import * as fromAuth from "../reducers/auth.reducer";

export const getAuthState = createSelector(
    fromFeatures.getDataState,
    (state: fromFeatures.DataState) => state.auth
);

export const getLoggedIn = createSelector(
    getAuthState,
    fromAuth.getLoggedIn
);

export const getUser = createSelector(
    getAuthState,
    fromAuth.getUser
);
