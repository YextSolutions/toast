import { useContext } from "react";
import { BeverageFacets } from "./BeverageFacets";
import { SortingDrawer } from "./SortingDrawer";
import { OverlayActionTypes, OverlayContext } from "../providers/OverlayProvider";

export const FilterOverlay = () => {
  const { overlayState, dispatch } = useContext(OverlayContext);

  if (!overlayState.searchOverlay.open) {
    return overlayState.filterOverlay.open ? (
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
            dispatch({ type: OverlayActionTypes.ToggleFilterOverlay, payload: { open: true } })
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
