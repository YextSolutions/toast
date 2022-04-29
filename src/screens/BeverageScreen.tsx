import { useContext, useEffect, useState } from "react";
import { SearchCtx } from "../App";
import { MdLocationPin } from "react-icons/md";
import BeverageBreadcrumbs from "../components/BeverageBreadcrumbs";
import { BeverageSearchBar } from "../components/BeverageSearchBar";
import { ToastHeader } from "../components/ToastHeader";
import { Beverage } from "../types/Beverage";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { CartActionTypes, CartContext } from "../providers/CartProvider";

const liveApiKey = import.meta.env.VITE_LIVE_API_KEY;

interface LocationState {
  state: {
    beverage: Partial<Beverage>;
  };
}

export const BeverageScreen = (): JSX.Element => {
  const [beverageData, setBeverageData] = useState<Partial<Beverage>>({});

  const { searchBarActive } = useContext(SearchCtx);
  const cartContext = useContext(CartContext);
  const { cart } = cartContext;

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

  useEffect(() => {
    console.log(beverageData);
  }, [beverageData]);

  return (
    <>
      <ToastHeader />
      {searchBarActive ? (
        <BeverageSearchBar />
      ) : (
        <div className="absolute top-28 bottom-16 overflow-auto w-full px-4">
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
          {beverageData?.name && <div className="font-semibold my-4">{beverageData.name}</div>}
          {beverageData?.c_price && (
            <div className="font-semibold text-sm my-4">{`$${beverageData.c_price}`}</div>
          )}
          {beverageData?.c_originCountry && (
            <div className="text-xs my-4 flex items-center">
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
      )}
      <div className="fixed z-20 bottom-0 w-full bg-white flex justify-center items-center h-16 border-t">
        <button
          className="bg-toast-blue w-80 h-10 rounded"
          onClick={() =>
            cartContext.dispatch({
              type: CartActionTypes.ADD_ITEM,
              payload: { beverage: beverageData },
            })
          }
        >
          <p className="text-white text-center font-bold text-base">SORT / FILTER</p>
        </button>
      </div>
    </>
  );
};
