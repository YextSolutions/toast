import { useContext, useEffect, useState } from "react";
import { BeverageCard } from "../components/BeverageCard";
import { BeverageSearchBar } from "../components/BeverageSearchBar";
import { CounterAction, ProductCounter } from "../components/ProductCounter";
import { ToastHeader } from "../components/ToastHeader";
import { CartActionTypes, CartContext } from "../providers/CartProvider";
import { MobileViewContext } from "../providers/MobileViewProvider";

export const CartScreen = () => {
  const { mobileView } = useContext(MobileViewContext);
  const cartContext = useContext(CartContext);
  const { cart } = cartContext;

  const handleQuantityChange = (
    quantity: number,
    changer?: { action: CounterAction; productId: string }
  ) => {
    if (!changer) return;

    if (changer.action === "add") {
      cartContext.dispatch({
        type: CartActionTypes.ADD_ITEM,
        payload: { beverage: { id: changer.productId }, quantity: 1 },
      });
    } else if (changer.action === "subtract") {
      cartContext.dispatch({
        type: CartActionTypes.REMOVE_ITEM,
        payload: { beverage: { id: changer.productId } },
      });
    }
  };

  return (
    <>
      <ToastHeader />
      {mobileView.searchBarActive ? (
        <BeverageSearchBar />
      ) : (
        <div className="absolute px-4 w-full top-28 bottom-16">
          <div className="h-16 w-full border-b border-toast-orange  flex justify-center items-center">
            <div className="text-toast-dark-orange font-bold">Your Cart</div>
          </div>
          <div>
            {cart.cartItems.map((item) => (
              <div className="py-2 flex items-end justify-between">
                <BeverageCard
                  autocomplete
                  name={item.beverage.name}
                  price={item.beverage.c_price}
                  imageUrl={item.beverage.primaryPhoto?.image.url}
                />
                {item.beverage.id && (
                  <ProductCounter productId={item.beverage.id} onChange={handleQuantityChange} />
                )}
              </div>
            ))}
          </div>
          <div className="h-16 w-full border-b border-toast-orange  flex justify-center items-center">
            <div className="text-toast-dark-orange font-bold">Order Summary</div>
          </div>
          <div className="flex justify-between w-full pt-1">
            <div className="font-bold">TOTAL:</div>
            <div className="font-bold">{`$${cart.totalPrice}`}</div>
          </div>
        </div>
      )}
    </>
  );
};
