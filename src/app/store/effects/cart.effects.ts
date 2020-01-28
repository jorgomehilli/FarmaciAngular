import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../state/app.state';
import {
    GetItemsSuccess,
    ECartActions,
    GetItems
  } from '../actions/cart.actions';
import { CartService } from 'src/app/cart/cart.service';
import { selectUserList } from '../selectors/cart.selectors';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class CartEffects{
    @Effect()
    getItems$ = this._actions$.pipe(
        ofType<GetItems>(ECartActions.GetItems),
        switchMap(() => this._cartService.getProducts(this.authService.getActualUserId())),
        switchMap( (response: any [])  => of(new GetItemsSuccess(response)))
      );





    constructor(
        private _cartService: CartService,
        private _actions$: Actions,
        private authService: AuthService,
        private _store: Store<AppState>
      ) {}
}