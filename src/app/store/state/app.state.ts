import {CartState, initialCartState} from './cart.state';

export interface AppState {
    cartItems: CartState;
  };

  export const initialAppState: AppState = {
    cartItems: initialCartState
  };

  export function getInitialState(): AppState {
    return initialAppState;
  }