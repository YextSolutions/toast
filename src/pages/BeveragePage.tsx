import { useContext, useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import BeverageBreadcrumbs from "../components/BeverageBreadcrumbs";
import Beverage from "../types/beverages";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { CartActionTypes, CartContext } from "../providers/CartProvider";
import { ProductCounter } from "../components/ProductCounter";
import { OverlayContext } from "../providers/OverlayProvider";
import { PageLayout } from "./PageLayout";

const liveApiKey = import.meta.env.VITE_LIVE_API_KEY;

interface LocationState {
  state: {
    // TODO: change to Beverage
    beverage: Beverage;
  };
}

export const BeveragePage = (): JSX.Element => {
  const [beverage, setBeverage] = useState<Beverage | null>();
  const [count, setCount] = useState(1);

  const { overlayState } = useContext(OverlayContext);
  const cartContext = useContext(CartContext);

  const location = useLocation() as unknown as LocationState;
  const urlParams = useParams();

  useEffect(() => {
    const fetchEntity = async (beverageId: string) => {
      const result = await axios(
        `https://liveapi-sandbox.yext.com/v2/accounts/3155222/entities/${beverageId}?api_key=${liveApiKey}&v=20220322`
      );
      setBeverage({ ...result.data.response, id: result.data.response.meta.id });
    };

    if (location.state?.beverage) {
      // TODO: fix this
      setBeverage(location.state?.beverage as Beverage);
    } else {
      const { beverageId } = urlParams;
      if (beverageId) {
        fetchEntity(beverageId);
      }
    }
  }, [location.state]);

  return (
    <PageLayout>
      <>
        <div className="absolute top-28 bottom-16 w-full overflow-auto px-4">
          <div className="my-8 text-sm">
            <BeverageBreadcrumbs
              beverageCategories={{
                alcoholType: beverage?.c_alcoholType,
                category: beverage?.c_category,
                subCategory: beverage?.c_subCategory,
                beverageId: beverage?.id,
              }}
            />
          </div>
          {beverage?.primaryPhoto && (
            <div className="flex justify-center">
              <img className="w-60" src={beverage.primaryPhoto.image.url} />
            </div>
          )}
          {beverage?.name && <div className="my-4 font-semibold">{beverage.name}</div>}
          {beverage?.c_price && (
            <div className="my-4 text-sm font-semibold">{`$${beverage.c_price}`}</div>
          )}
          {beverage?.c_originCountry && (
            <div className="my-4 flex items-center text-xs">
              <MdLocationPin size={20} className="mr-1 text-toast-dark-orange" />
              {beverage?.c_usState && <span className="mr-1">{`${beverage.c_usState},`}</span>}
              {beverage?.c_originCountry}
            </div>
          )}
          {beverage?.description && <p className="leading-relaxed">{beverage.description}</p>}
        </div>
        {!overlayState.searchOverlay.open && (
          <div className="fixed bottom-0 z-20 flex h-16 w-full items-center justify-center border-t bg-white">
            {beverage?.id && (
              <ProductCounter id={beverage.id} onChange={setCount} quantity={count} />
            )}
            {beverage?.id && (
              <button
                className="ml-6 h-10 w-52 rounded bg-toast-blue"
                onClick={() =>
                  cartContext.dispatch({
                    type: CartActionTypes.AddItem,
                    payload: { beverage, quantity: count },
                  })
                }
              >
                <p className="text-center text-base font-bold text-white">ADD TO CART</p>
              </button>
            )}
          </div>
        )}
      </>
    </PageLayout>
  );
};
