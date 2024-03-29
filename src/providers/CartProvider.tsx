import { Context, createContext, useEffect, useReducer, Dispatch } from "react";
import Beverage from "../types/beverages";
import { ProviderProps } from "./AppContextProvider";

export interface CartState {
  cartItems: {
    beverage: Beverage;
    quantity: number;
  }[];
  totalPrice: number;
}

export enum CartActionTypes {
  AddItem,
  RemoveItem,
}

export interface AddItem {
  type: CartActionTypes.AddItem;
  payload: { beverage: Beverage; quantity: number };
}

export interface RemoveItem {
  type: CartActionTypes.RemoveItem;
  payload: { beverage: Beverage };
}

export type CartActions = AddItem | RemoveItem;

interface CartContext {
  cart: CartState;
  dispatch: React.Dispatch<CartActions>;
}

const initialState = JSON.parse(
  (localStorage.getItem("cart") as string) || JSON.stringify({ cartItems: [] })
);

export const cartReducer = (state = initialState as CartState, action: CartActions) => {
  switch (action.type) {
    case CartActionTypes.AddItem:
      const itemToAdd = state.cartItems.find(
        (item) => item.beverage.id === action.payload.beverage.id
      );
      if (itemToAdd) {
        itemToAdd.quantity += action.payload.quantity;
      } else {
        state.cartItems.push({
          beverage: action.payload.beverage,
          quantity: action.payload.quantity,
        });
      }
      return { ...state, totalPrice: calculateTotalPrice(state.cartItems) };

    case CartActionTypes.RemoveItem:
      const itemToRemove = state.cartItems.find(
        (item) => item.beverage.id === action.payload.beverage.id
      );
      if (itemToRemove) {
        itemToRemove.quantity--;
        if (itemToRemove.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.beverage.id !== action.payload.beverage.id
          );
        }
        return { ...state, totalPrice: calculateTotalPrice(state.cartItems) };
      }
    default:
      return state;
  }
};

const calculateTotalPrice = (cartItems: { beverage: Beverage; quantity: number }[]): number => {
  return (
    Math.round(
      cartItems
        .map((item) => (Number(item.beverage.c_price) ?? 0) * item.quantity)
        .reduce((a, b) => a + b, 0) * 100
    ) / 100
  );
};

const CartContext = createContext<{ cartState: CartState; dispatch: Dispatch<CartActions> }>({
  cartState: initialState,
  dispatch: () => {},
});

const CartProvider = ({ children }: ProviderProps) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  return <CartContext.Provider value={{ cartState, dispatch }}>{children}</CartContext.Provider>;
};

export { CartProvider, CartContext };
