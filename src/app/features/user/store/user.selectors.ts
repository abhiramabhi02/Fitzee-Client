import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userState } from "./user.reducer";


// select the user state
export const selectUserState = createFeatureSelector<userState>('users')

export const selectUserData = createSelector(
    selectUserState,
    (state:userState) => state.users
)

export const selectIsLoggedIn = createSelector(
    selectUserState,
    (state:userState) => state.isLoggedIn
)