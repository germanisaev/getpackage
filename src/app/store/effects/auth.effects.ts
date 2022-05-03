import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { exhaustMap, map, catchError, tap, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService, OrderDeliveryService } from '@app/services';
import {
  AuthActionTypes,
  CreateFailure,
  CreateSuccess,
  Create,
  LogIn,
  LogInFailure,
  LogInSuccess,
  GetCity,
  CitySuccess,
  CityFailure,
} from '../actions';
import { AppState } from '../app.states';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private _service: OrderDeliveryService,
    private router: Router,
  ) { }

  @Effect()
  LogIn: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.username, payload.password)
        .pipe(
          map((user: any) => {
            console.log('LogIn: ');
            console.log(user);

            if (user.res === 'unknown request') {
              return new LogInFailure({ error: user.res });
            }

            return new LogInSuccess({ token: user, username: payload.username });
          }),
          catchError((error) => {
            console.log(error);
            return of(new LogInFailure({ error: error }));
          }));
    }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user: any) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/create');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );


  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    })
  );

  @Effect({ dispatch: false })
  GetCity: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.GET_CITY),
    map((action: GetCity) => action),
    switchMap(payload => {
      console.log(payload);
      return this._service.getCities().pipe(map((city) => {
        console.log(city);
        return new CitySuccess({ payload: payload });
      }),
        catchError((error) => {
          console.log(error);
          return of(new CityFailure({ error: error }));
        }));
    }));




  @Effect({ dispatch: false })
  Create: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.CREATE),
    map((action: Create) => action.payload),
    switchMap(payload => {
      return this._service.createOrder(payload).pipe(map((city) => {
        console.log(city);
        return new CreateSuccess({ payload: payload });
      }),
        catchError((error) => {
          console.log(error);
          return of(new CreateFailure({ error: error }));
        }));
    }));

  @Effect({ dispatch: false })
  CreateSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.CREATE_SUCCESS),
    tap((response: any) => {
      console.log(response);
    })
  );

  @Effect({ dispatch: false })
  CreateFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.CREATE_FAILURE)
  );
}