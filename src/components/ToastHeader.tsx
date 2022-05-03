import { useContext, useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SearchCtx } from "../App";
import { ToastBanner } from "./ToastBanner";
import classNames from "classnames";
import { useAnswersActions } from "@yext/answers-headless-react";
import { CartContext } from "../providers/CartProvider";
import { BeverageSearchBar } from "./BeverageSearchBar";

export const ToastHeader = (): JSX.Element => {
  const [totalCartItems, setTotalCartItems] = useState(0);

  const answersActions = useAnswersActions();

  const { searchBarActive, setSearchBarActive, filterSectionActive } = useContext(SearchCtx);
  const cartContext = useContext(CartContext);
  const { cart } = cartContext;

  useEffect(() => {
    setTotalCartItems(cart.cartItems.map((item) => item.quantity).reduce((a, b) => a + b, 0));
  }, [cart]);

  const searchBarChangeHandler = (change: boolean) => {
    setSearchBarActive(change);
  };

  const clearSearchState = () => {
    searchBarChangeHandler(false);
    answersActions.setQuery("");
    answersActions.setSortBys([]);
    answersActions.resetFacets();
  };

  return (
    <header className="absolute top-0 w-full z-20">
      <div
        className={classNames("w-full bg-toast-orange h-16 flex items-center", {
          "h-5": filterSectionActive,
        })}
      >
        {!filterSectionActive && (
          <div className="flex  w-full justify-between">
            <div className="w-1/3 text-toast-dark-orange ml-6 md:hidden">
              {!searchBarActive ? (
                <AiOutlineMenu size={30} />
              ) : (
                <button
                  className=" text-text-toast-red flex items-center"
                  onClick={() => searchBarChangeHandler(false)}
                >
                  <AiOutlineClose size={30} />
                </button>
              )}
            </div>
            <div className=" flex justify-center items-center md:justify-start md:pl-4">
              <Link
                className="text-3xl text-toast-red font-semibold flex items-center"
                to="/"
                onClick={() => clearSearchState()}
              >
                <span>TOAST</span>
                <div className="hidden md:flex pl-4 text-black text-sm">
                  <Link className="px-4" to="/wine">
                    WINE
                  </Link>
                  <Link className="px-4" to="/beer">
                    BEER
                  </Link>
                  <Link className="px-4" to="/liquor">
                    SPIRITS
                  </Link>
                  <div className="px-4">OTHER</div>
                </div>
              </Link>
              <div className="hidden md:block">
                <BeverageSearchBar />
              </div>
            </div>
            <div className=" w-1/3 flex justify-end mr-6 text-toast-dark-orange items-center">
              <button
                className="md:hidden h-8 w-8 mr-4"
                onClick={() => searchBarChangeHandler(true)}
              >
                <MagnifyingGlassIcon />
              </button>
              <Link className="relative" to="/cart">
                <FaShoppingBasket size={30} />
                {totalCartItems > 0 && (
                  <div className="bg-toast-red rounded-full h-3.5 w-3.5 text-white text-xxs flex justify-center items-center font-bold absolute -bottom-0.5 right-0">
                    {totalCartItems}
                  </div>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
      {!searchBarActive && <ToastBanner />}
    </header>
  );
};

// forked from component library
function MagnifyingGlassIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}
