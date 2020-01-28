export interface CartState {
    cartItems: any [];
    selectedCartItem: any;
  }
  
  export const initialCartState: CartState = {
    cartItems: null,
    selectedCartItem: null
  };