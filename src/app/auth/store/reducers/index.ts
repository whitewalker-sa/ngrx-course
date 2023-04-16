import { createReducer, on } from "@ngrx/store";
import { User } from "../../model/user.model";
import { AuthActions } from "../actions/action-types";

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    // console.log("Calling login reducer");
    return {
      user: action.user,
    };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined,
    };
  })
);
