import { useSearchState } from "@yext/search-headless-react";
import { useContext, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import { OverlayActionTypes, OverlayContext } from "../providers/OverlayProvider";
import sortConfig from "../config/sortConfig";

interface SortingDrawerProps {
  containerCss?: string;
}

export const SortingDrawer = ({ containerCss = "" }: SortingDrawerProps) => {
  const [open, setOpen] = useState(false);

  const sortBys = useSearchState((state) => state.vertical.sortBys);
  const selectedSort = Object.values(sortConfig).find(
    (s) => s.sortBy.field === sortBys?.[0]?.field && s.sortBy.direction === sortBys?.[0]?.direction
  );

  const { dispatch } = useContext(OverlayContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleTileClick = (urlValue: string) => {
    setOpen(false);
    dispatch({ type: OverlayActionTypes.ToggleFilterOverlay, payload: { open: false } });

    searchParams.set("sortBy", urlValue);

    setSearchParams(searchParams);
  };

  return (
    <div className={classNames("flex", containerCss)}>
      <div className="relative">
        <div className="flex h-10 w-48 items-center justify-between border border-toast-dark-orange bg-toast-light-orange px-2">
          <div className="text-sm ">
            <div className="font-semibold">Sort By:</div>
            <div>{selectedSort?.label}</div>
          </div>
          <button onClick={() => setOpen(!open)}>
            {open ? <BiChevronUp /> : <BiChevronDown />}
          </button>
        </div>
        <ul
          className={classNames("absolute flex flex-col border", {
            "mt-2 border-toast-dark-orange": open,
          })}
        >
          {open &&
            Object.entries(sortConfig)
              .filter(([k, v]) => v.sortBy !== selectedSort?.sortBy)
              .map(([k, v]) => (
                <li onClick={() => handleTileClick(k)}>
                  <div className="flex h-10 w-48 items-center bg-toast-light-orange px-2 text-sm hover:bg-toast-orange">
                    {v.label}
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};
