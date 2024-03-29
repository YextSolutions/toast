import { useContext, useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastBanner } from "./ToastBanner";
import classNames from "classnames";
import { useSearchActions } from "@yext/search-headless-react";
import { CartContext } from "../providers/CartProvider";
import { BeverageSearchBar } from "./BeverageSearchBar";
import { OverlayActionTypes, OverlayContext } from "../providers/OverlayProvider";
import { MagnifyingGlassIcon } from "../icons/MagnifyingGlassIcon";
import useWindowDimensions from "../hooks/useWindowDimensions";

export const ToastHeader = (): JSX.Element => {
  const [totalCartItems, setTotalCartItems] = useState(0);

  const searchActions = useSearchActions();

  const { overlayState, dispatch } = useContext(OverlayContext);
  const cartContext = useContext(CartContext);
  const { cartState } = cartContext;

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 768) {
      searchBarChangeHandler(false);
      dispatch({
        type: OverlayActionTypes.ToggleFilterOverlay,
        payload: { open: false },
      });
    }
  }, [width]);

  useEffect(() => {
    setTotalCartItems(cartState.cartItems.map((item) => item.quantity).reduce((a, b) => a + b, 0));
  }, [cartState]);

  const searchBarChangeHandler = (open: boolean) => {
    dispatch({ type: OverlayActionTypes.ToggleSearchOverlay, payload: { open } });
  };

  const clearSearchState = () => {
    searchBarChangeHandler(false);
    searchActions.setQuery("");
    searchActions.setSortBys([]);
    searchActions.resetFacets();
  };

  return (
    <header className="absolute top-0 z-20 w-full">
      <div
        className={classNames("flex h-16 w-full items-center bg-toast-orange", {
          "h-5": overlayState.filterOverlay.open,
        })}
      >
        {!overlayState.filterOverlay.open && (
          <div className="flex w-full justify-between">
            <div className="ml-6 w-1/3 text-toast-dark-orange md:hidden">
              {!overlayState.searchOverlay.open ? (
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
            <div className="flex items-center justify-center md:justify-start md:pl-4">
              <Link
                className="text-3xl font-semibold text-toast-red"
                to="/"
                onClick={() => clearSearchState()}
              >
                <span>TOAST</span>
              </Link>
              <div className="hidden pl-4 text-sm text-black md:flex">
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
              <div
                className={classNames("md:block", {
                  "fixed top-16 h-full w-full overflow-y-scroll bg-white":
                    overlayState.searchOverlay.open,
                  hidden: !overlayState.searchOverlay.open,
                })}
              >
                <BeverageSearchBar />
              </div>
            </div>
            <div className="mr-6 flex w-1/3 items-center justify-end text-toast-dark-orange">
              <button
                className="mr-4 h-8 w-8 md:hidden"
                onClick={() => searchBarChangeHandler(true)}
              >
                <MagnifyingGlassIcon />
              </button>
              <Link className="relative" to="/cart">
                <FaShoppingBasket size={30} />
                {totalCartItems > 0 && (
                  <div className="absolute -bottom-0.5 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-toast-red text-xxs font-bold text-white">
                    {totalCartItems}
                  </div>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
      {!overlayState.searchOverlay.open && <ToastBanner />}
    </header>
  );
};
