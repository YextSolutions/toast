import { useContext } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { CartContext } from "../providers/CartProvider";

interface ProductCounterProps {
  id: string;
  onChange: (
    quantity: number,
    changer?: { action: CounterAction; id: string; name: string }
  ) => void;
  quantity?: number;
}

export type CounterAction = "add" | "subtract";

export const ProductCounter = ({ id, onChange, quantity }: ProductCounterProps) => {
  const { cartState } = useContext(CartContext);
  const displayQuantity =
    quantity ?? cartState.cartItems.find((item) => item.beverage.id === id)?.quantity ?? 1;

  return (
    <div className="flex h-10 w-28 border">
      <button
        className="flex w-1/3 items-center justify-center disabled:opacity-30"
        disabled={quantity === 1}
        onClick={() => onChange(displayQuantity - 1, { action: "subtract", id, name: "" })}
      >
        <AiOutlineMinus size={24} />
      </button>
      <div className="text-xlreacreac flex w-1/3 items-center justify-center">
        {displayQuantity}
      </div>
      <button
        className="flex w-1/3 items-center justify-center"
        onClick={() => onChange(displayQuantity + 1, { action: "add", id, name: "" })}
      >
        <AiOutlinePlus size={24} />
      </button>
    </div>
  );
};
