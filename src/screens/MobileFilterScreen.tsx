import { useContext } from "react";
import { BeverageFacets } from "../components/BeverageFacets";
import { SortingDrawer } from "../components/SortingDrawer";
import { MobileViewActionTypes, MobileViewContext } from "../providers/MobileViewProvider";

export const MobileFilterScreen = () => {
  const { mobileView, dispatch } = useContext(MobileViewContext);

  if (!mobileView.searchBarActive) {
    return mobileView.filterSectionActive ? (
      <div className="fixed top-[4.25rem] right-0 left-0 h-full w-full overflow-y-auto bg-white">
        <div className="mt-8">
          <SortingDrawer containerCss="px-4 mb-8" />
          <div className="pb-16">
            <BeverageFacets />
          </div>
        </div>
      </div>
    ) : (
      <div className="fixed bottom-0 z-20 flex h-16 w-full items-center justify-center border-t bg-white md:hidden">
        <button
          className="h-10 w-80 rounded bg-toast-blue"
          onClick={() =>
            dispatch({ type: MobileViewActionTypes.TOGGLE_FILTER_SECTION, payload: true })
          }
        >
          <p className="text-center text-base font-bold text-white">SORT / FILTER</p>
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};
