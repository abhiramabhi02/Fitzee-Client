import { createAction, props } from "@ngrx/store";

//action for storing data when user is logged in
export const loginUser = createAction('[User] Login', props<{user:any}>())

// action for user logout
export const logoutUser = createAction('[User] Logout')