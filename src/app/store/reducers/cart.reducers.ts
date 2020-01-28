import {ECartActions} from '../actions/cart.actions';
import {CartActions} from '../actions/cart.actions';
import { initialCartState, CartState } from '../state/cart.state';

export const cartReducers = (
    state = initialCartState,
    action: CartActions
  ): CartState => {
    switch (action.type) {
      case ECartActions.GetItemsSuccess: {
        return {
          ...state,
          cartItems: action.payload
        };
      }
      case ECartActions.DeleteItem:{
        return {
          ...state,
          cartItems: state.cartItems.filter((cartItem, index)=>{
            return index !== action.payload;
          })
        }
      };
      case ECartActions.AddItem:{
        return {
          ...state,
          cartItems: [state.cartItems, action.payload]
        }
      }
      default:
           return state;
    };

}
