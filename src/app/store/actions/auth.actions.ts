import { Action } from '@ngrx/store';


export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',
    CREATE = '[Auth] Create',
    CREATE_SUCCESS = '[Auth] Create Success',
    CREATE_FAILURE = '[Auth] Create Failure',
    LOGOUT = '[Auth] Logout',
    GET_CITY = '[Auth] GetCity',
    CITY_SUCCESS = '[Auth] City Success',
    CITY_FAILURE = '[Auth] City Failure'
}

export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class LogInFailure implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: any) { }
}

export class LogOut implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export class GetCity implements Action {
    readonly type = AuthActionTypes.GET_CITY;
}

export class CitySuccess implements Action {
    readonly type = AuthActionTypes.CITY_SUCCESS;
    constructor(public payload: any) { }
}

export class CityFailure implements Action {
    readonly type = AuthActionTypes.CITY_FAILURE;
    constructor(public payload: any) { }
}

export class Create implements Action {
    readonly type = AuthActionTypes.CREATE;
    constructor(public payload: any) { }
}

export class CreateSuccess implements Action {
    readonly type = AuthActionTypes.CREATE_SUCCESS;
    constructor(public payload: any) { }
}

export class CreateFailure implements Action {
    readonly type = AuthActionTypes.CREATE_FAILURE;
    constructor(public payload: any) { }
}


export type All =
    | LogIn
    | LogInSuccess
    | LogInFailure
    | LogOut
    | GetCity
    | CitySuccess
    | CityFailure
    | Create
    | CreateSuccess
    | CreateFailure
    ;