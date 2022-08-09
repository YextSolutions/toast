import { Direction, SortBy, SortType, useSearchState } from "@yext/search-headless-react";
import { useContext, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import { OverlayActionTypes, OverlayContext } from "../providers/OverlayProvider";

const sortByOptions: { label: string; sortBy: SortBy }[] = [
  {
    label: "Price: High to Low",
    sortBy: { field: "c_price", direction: Direction.Descending, type: SortType.Field },
  },
  {
    label: "Price: Low to High",
    sortBy: { field: "c_price", direction: Direction.Ascending, type: SortType.Field },
  },
  {
    label: "Name: A-Z",
    sortBy: { field: "name", direction: Direction.Ascending, type: SortType.Field },
  },
  {
    label: "Name: Z-A",
    sortBy: { field: "name", direction: Direction.Descending, type: SortType.Field },
  },
];

interface SortingDrawerProps {
  containerCss?: string;
}

export const SortingDrawer = ({ containerCss = "" }: SortingDrawerProps) => {
  const [open, setOpen] = useState(false);

  const sortBys = useSearchState((state) => state.vertical.sortBys);
  const selectedSort = sortByOptions.find(
    (s) => s.sortBy.field === sortBys?.[0]?.field && s.sortBy.direction === sortBys?.[0]?.direction
  );

  const { dispatch } = useContext(OverlayContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleTileClick = (sortBy: SortBy) => {
    setOpen(false);
    dispatch({ type: OverlayActionTypes.ToggleFilterOverlay, payload: { open: false } });

    searchParams.delete("sortBy");
    searchParams.append("sortBy", JSON.stringify(sortBy));

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
            sortByOptions
              .filter((s) => s.sortBy !== selectedSort?.sortBy)
              .map((s) => (
                <li onClick={() => handleTileClick(s.sortBy)}>
                  <div className="flex h-10 w-48 items-center bg-toast-light-orange px-2 text-sm hover:bg-toast-orange">
                    {s.label}
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};
