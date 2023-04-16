import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers";

export const authFeatureKey = "auth";
export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

// A createSelector function is simply a map function with memory, we use it to query our store state
export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  (loggedIn: boolean) => !loggedIn
);
