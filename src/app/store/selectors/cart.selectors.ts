
import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { CartState } from '../state/cart.state';

const selectItems = (state: AppState) => state.cartItems;

export const selectUserList = createSelector(
  selectItems,
  (state: CartState) => state.cartItems
);
