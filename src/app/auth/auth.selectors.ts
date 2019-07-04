import { createSelector } from '@ngrx/store';

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(
    selectAuthState,
    auth => auth.loggedIn
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
);

export const accessToken = createSelector(
    selectAuthState,
    auth => auth.user.access_token
);

export const allScopes = createSelector(
    selectAuthState,
    auth => auth.user.scope
);
