import { createReducer, on } from '@ngrx/store';
import { User } from "@app/models/user";
import { All, AuthActionTypes } from "../actions";

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    username: action.payload.username
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Incorrect username and/or password.'
            };
        }
        case AuthActionTypes.CREATE_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                errorMessage: 'This order success created.'
            };
        }
        case AuthActionTypes.CREATE_FAILURE: {
            return {
                ...state,
                errorMessage: 'This order could not be created.'
            };
        }
        case AuthActionTypes.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}