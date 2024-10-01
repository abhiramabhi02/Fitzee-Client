import { createReducer, on } from '@ngrx/store';
import { loginUser, logoutUser } from './user.actions';

export interface userState {
  users: any;
  isLoggedIn: boolean;
}

export const initialState: userState = {
    users : null,
    isLoggedIn: false
}

export const userReducer = createReducer(initialState,
    on(loginUser, (state, {user})=>{
        return {
            ...state,
            users:user,
            isLoggedIn:true
        }  
    }),
    on(logoutUser, state =>({
        ...state,
        users:null,
        isLoggedIn:false
    }))
)
