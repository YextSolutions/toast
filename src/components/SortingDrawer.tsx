import {
  Direction,
  SortBy,
  SortType,
  useAnswersActions,
  useAnswersState,
} from "@yext/answers-headless-react";
import { useContext, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { SearchCtx } from "../App";
import classNames from "classnames";

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
  label?: string;
}

export const SortingDrawer = ({ containerCss = "", label }: SortingDrawerProps) => {
  const [open, setOpen] = useState(false);

  const sortBys = useAnswersState((state) => state.vertical.sortBys);
  const selectedSort = sortByOptions.find((s) => s.sortBy.field === sortBys?.[0].field);
  const answersActions = useAnswersActions();

  const { setFilterSectionActive } = useContext(SearchCtx);

  const handleTileClick = (sortBy: SortBy) => {
    setOpen(false);
    answersActions.setSortBys([sortBy]);
    answersActions.executeVerticalQuery();
    setFilterSectionActive(false);
  };

  return selectedSort ? (
    <div className={classNames("flex", containerCss)}>
      {label && <div className="font-bold mr-4">{label}</div>}
      <div className="relative">
        <div className="w-full border border-toast-dark-orange h-10 w-48 flex justify-between items-center px-2 bg-toast-light-orange">
          <div>{selectedSort.label}</div>
          <button onClick={() => setOpen(!open)}>
            {open ? <BiChevronUp /> : <BiChevronDown />}
          </button>
        </div>
        <ul className="mt-2 flex flex-col absolute border border-toast-dark-orange">
          {open &&
            sortByOptions
              .filter((s) => s.sortBy !== selectedSort.sortBy)
              .map((s) => (
                <li onClick={() => handleTileClick(s.sortBy)}>
                  <div className="w-full h-10 w-48 flex items-center px-2 bg-toast-light-orange hover:bg-toast-orange text-base">
                    {s.label}
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );
};
