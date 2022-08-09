import { useContext } from "react";
import { BeverageCard } from "../components/BeverageCard";
import { CounterAction, ProductCounter } from "../components/ProductCounter";
import { CartActionTypes, CartContext } from "../providers/CartProvider";
import { PageLayout } from "./PageLayout";
import { Source } from "@yext/search-headless-react";

export const CartPage = () => {
  const cartContext = useContext(CartContext);
  const { cart } = cartContext;

  const handleQuantityChange = (
    quantity: number,
    changer?: { action: CounterAction; id: string; name: string }
  ) => {
    if (!changer) return;

    if (changer.action === "add") {
      cartContext.dispatch({
        type: CartActionTypes.AddItem,
        payload: { beverage: { id: changer.id, name: changer.name }, quantity: 1 },
      });
    } else if (changer.action === "subtract") {
      cartContext.dispatch({
        type: CartActionTypes.RemoveItem,
        payload: { beverage: { id: changer.id, name: changer.name } },
      });
    }
  };

  const formatTotalPrice = (price: number) => {
    const priceString = price.toString();
    const priceParts = priceString.split(".");
    if (priceParts[1] && priceParts[1].length < 2) {
      return `${priceParts[0]}.${priceParts[1]}0`;
    } else {
      return priceString;
    }
  };

  return (
    <PageLayout>
      <div className="absolute top-28 bottom-16 w-full px-4">
        <div className="flex h-16 w-full items-center  justify-center border-b border-toast-orange">
          <div className="font-bold text-toast-dark-orange">Your Cart</div>
        </div>
        <div>
          {cart.cartItems.map((item) => (
            <div className="flex items-end justify-between py-2">
              <BeverageCard
                autocomplete
                result={{ rawData: item.beverage, source: Source.KnowledgeManager }}
              />
              {item.beverage.id && (
                <ProductCounter id={item.beverage.id} onChange={handleQuantityChange} />
              )}
            </div>
          ))}
        </div>
        <div className="flex h-16 w-full items-center  justify-center border-b border-toast-orange">
          <div className="font-bold text-toast-dark-orange">Order Summary</div>
        </div>
        <div className="flex w-full justify-between pt-1">
          <div className="font-bold">TOTAL:</div>
          <div className="font-bold">{`$${formatTotalPrice(cart.totalPrice)}`}</div>
        </div>
      </div>
    </PageLayout>
  );
};
