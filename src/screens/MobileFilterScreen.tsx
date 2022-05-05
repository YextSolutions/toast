import { useContext } from "react";
import { BeverageFacets } from "../components/BeverageFacets";
import { SortingDrawer } from "../components/SortingDrawer";
import { MobileViewActionTypes, MobileViewContext } from "../providers/MobileViewProvider";

export const MobileFilterScreen = () => {
  const { mobileView, dispatch } = useContext(MobileViewContext);

  return mobileView.filterSectionActive ? (
    <div className="top-28 right-0 left-0 bg-white h-full w-full fixed ">
      <div className="mt-8">
        <SortingDrawer containerCss="px-8 mb-8" />
        <BeverageFacets />
      </div>
    </div>
  ) : (
    <div className="flex md:hidden fixed z-20 bottom-0 w-full bg-white justify-center items-center h-16 border-t">
      <button
        className="bg-toast-blue w-80 h-10 rounded"
        onClick={() =>
          dispatch({ type: MobileViewActionTypes.TOGGLE_FILTER_SECTION, payload: true })
        }
      >
        <p className="text-white text-center font-bold text-base">SORT / FILTER</p>
      </button>
    </div>
  );
};
