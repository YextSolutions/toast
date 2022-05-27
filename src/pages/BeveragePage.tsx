import { useContext, useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import BeverageBreadcrumbs from "../components/BeverageBreadcrumbs";
import { Beverage } from "../types/Beverage";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { CartActionTypes, CartContext } from "../providers/CartProvider";
import { ProductCounter } from "../components/ProductCounter";
import { OverlayContext } from "../providers/OverlayProvider";
import { PageLayout } from "./PageLayout";

const liveApiKey = import.meta.env.VITE_LIVE_API_KEY;

interface LocationState {
  state: {
    beverage: Partial<Beverage>;
  };
}

export const BeveragePage = (): JSX.Element => {
  const [beverageData, setBeverageData] = useState<Partial<Beverage>>({});
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

      setBeverageData({ ...result.data.response, id: result.data.response.meta.id });
    };

    if (location.state?.beverage) {
      setBeverageData(location.state?.beverage as Partial<Beverage>);
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
                alcoholType: beverageData?.c_alcoholType,
                category: beverageData?.c_category,
                subCategory: beverageData?.c_subCategory,
                beverageId: beverageData?.id,
              }}
            />
          </div>
          {beverageData?.primaryPhoto && (
            <div className="flex justify-center">
              <img className="w-60" src={beverageData.primaryPhoto.image.url} />
            </div>
          )}
          {beverageData?.name && <div className="my-4 font-semibold">{beverageData.name}</div>}
          {beverageData?.c_price && (
            <div className="my-4 text-sm font-semibold">{`$${beverageData.c_price}`}</div>
          )}
          {beverageData?.c_originCountry && (
            <div className="my-4 flex items-center text-xs">
              <MdLocationPin size={20} className="mr-1 text-toast-dark-orange" />
              {beverageData?.c_usState && (
                <span className="mr-1">{`${beverageData.c_usState},`}</span>
              )}
              {beverageData?.c_originCountry}
            </div>
          )}
          {beverageData?.description && (
            <p className="leading-relaxed">{beverageData.description}</p>
          )}
        </div>
        {!overlayState.searchOverlay.open && (
          <div className="fixed bottom-0 z-20 flex h-16 w-full items-center justify-center border-t bg-white">
            {beverageData.id && (
              <ProductCounter productId={beverageData.id} onChange={setCount} quantity={count} />
            )}
            <button
              className="ml-6 h-10 w-52 rounded bg-toast-blue"
              onClick={() =>
                cartContext.dispatch({
                  type: CartActionTypes.AddItem,
                  payload: { beverage: beverageData, quantity: count },
                })
              }
            >
              <p className="text-center text-base font-bold text-white">ADD TO CART</p>
            </button>
          </div>
        )}
      </>
    </PageLayout>
  );
};
