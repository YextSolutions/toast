import { useContext } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { CartContext } from "../providers/CartProvider";

interface ProductCounterProps {
  productId: string;
  onChange: (quantity: number, changer?: { action: CounterAction; productId: string }) => void;
  quantity?: number;
}

export type CounterAction = "add" | "subtract";

export const ProductCounter = ({ productId, onChange, quantity }: ProductCounterProps) => {
  const { cart } = useContext(CartContext);
  const displayQuantity =
    quantity ?? cart.cartItems.find((item) => item.beverage.id === productId)?.quantity ?? 1;

  return (
    <div className="flex h-10 w-28 border">
      <button
        className="flex w-1/3 items-center justify-center disabled:opacity-30"
        disabled={quantity === 1}
        onClick={() => onChange(displayQuantity - 1, { action: "subtract", productId })}
      >
        <AiOutlineMinus size={24} />
      </button>
      <div className="text-xlreacreac flex w-1/3 items-center justify-center">
        {displayQuantity}
      </div>
      <button
        className="flex w-1/3 items-center justify-center"
        onClick={() => onChange(displayQuantity + 1, { action: "add", productId })}
      >
        <AiOutlinePlus size={24} />
      </button>
    </div>
  );
};
