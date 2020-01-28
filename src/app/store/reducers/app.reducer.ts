import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { cartReducers } from './cart.reducers';


export const appReducers: ActionReducerMap<AppState, any> = {
    cartItems: cartReducers
  };