import { AiOutlineMenu } from "react-icons/ai";
import { FaShoppingBasket } from "react-icons/fa";

export const Header = (): JSX.Element => {
  return (
    <>
      <div className="w-full bg-toast-orange h-16 flex items-center">
        <div className="w-1/3 text-toast-dark-orange ml-6">
          <AiOutlineMenu size={30} />
        </div>
        <div className="w-1/3 flex justify-center">
          <span className="text-3xl text-toast-red font-semibold">TOAST</span>
        </div>
        <div className="w-1/3 flex justify-end mr-6 text-toast-dark-orange">
          <FaShoppingBasket size={30} />
        </div>
      </div>
    </>
  );
};
