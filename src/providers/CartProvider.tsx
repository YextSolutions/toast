import { Context, createContext, useEffect, useReducer } from "react";
import { Beverage } from "../types/Beverage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface Cart {
  cartItems: {
    beverage: Partial<Beverage>;
    quantity: number;
  }[];
  totalPrice: number;
}

export enum CartActionTypes {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  CLEAR_CART = "CLEAR_CART",
}

type CartPayload = {
  [CartActionTypes.ADD_ITEM]: {
    beverage: Partial<Beverage>;
    quantity: number;
  };
  [CartActionTypes.REMOVE_ITEM]: {
    beverage: Partial<Beverage>;
  };
  [CartActionTypes.CLEAR_CART]: {};
};

export type CartActions = ActionMap<CartPayload>[keyof ActionMap<CartPayload>];

interface CartContext {
  cart: Cart;
  dispatch: React.Dispatch<CartActions>;
}

const initialState = JSON.parse(
  (localStorage.getItem("cart") as string) || JSON.stringify({ cartItems: [] })
);

export const cartReducer = (state = initialState as Cart, action: CartActions) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
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

    case CartActionTypes.REMOVE_ITEM:
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
    case CartActionTypes.CLEAR_CART:
      state.cartItems = [];
      return { ...state, totalPrice: 0 };
  }
};

const calculateTotalPrice = (
  cartItems: { beverage: Partial<Beverage>; quantity: number }[]
): number => {
  return (
    Math.round(
      cartItems
        .map((item) => (Number(item.beverage.c_price) ?? 0) * item.quantity)
        .reduce((a, b) => a + b, 0) * 100
    ) / 100
  );
};

const CartContext: Context<CartContext> = createContext({} as CartContext);

const CartProvider: React.FC = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
};

export { CartProvider, CartContext };
