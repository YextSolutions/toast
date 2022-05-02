import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface ProductCounterProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

export const ProductCounter = ({ quantity, onChange }: ProductCounterProps) => {
  return (
    <div className="h-10 w-28 border flex">
      <button
        className="w-1/3 flex justify-center items-center disabled:opacity-30"
        disabled={quantity === 1}
        onClick={() => onChange(quantity - 1)}
      >
        <AiOutlineMinus size={24} />
      </button>
      <div className="w-1/3 flex justify-center items-center text-xlreacreac">{quantity}</div>
      <button
        className="w-1/3 flex justify-center items-center"
        onClick={() => onChange(quantity + 1)}
      >
        <AiOutlinePlus size={24} />
      </button>
    </div>
  );
};
