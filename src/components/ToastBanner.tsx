import { FaFilter } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { OverlayActionTypes, OverlayContext } from "../providers/OverlayProvider";

export const ToastBanner = (): JSX.Element => {
  const { overlayState, dispatch } = useContext(OverlayContext);

  // TODO: How do I know if the order of tailwind classes is important?
  return (
    <div className="flex h-12 w-full items-center bg-toast-light-orange shadow-lg">
      <div className="w-full">
        <span>
          {overlayState.filterOverlay.open ? (
            <div className="flex items-center justify-between px-6 font-bold">
              <div className="flex items-center">
                FILTER <FaFilter className="ml-1.5" />
              </div>
              <button
                onClick={() =>
                  dispatch({
                    type: OverlayActionTypes.ToggleFilterOverlay,
                    payload: { open: false },
                  })
                }
              >
                <AiOutlineClose size={24} className="text-toast-dark-orange" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div>
                Deliver to <span className="text-toast-dark-orange">61 9th Ave</span>
              </div>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};
