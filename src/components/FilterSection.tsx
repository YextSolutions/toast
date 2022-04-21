import { Filters } from "@yext/answers-react-components";
import { useContext, useEffect, useState } from "react";
import { SearchCtx } from "../App";
import { FilterTileGroup } from "./FilterTileGroup";
import { SortingDrawer } from "./SortingDrawer";

export const FilterSection = () => {
  const { filterSectionActive, setFilterSectionActive } = useContext(SearchCtx);

  return filterSectionActive ? (
    <div className="top-16 right-0 left-0 bg-white h-full w-full absolute">
      <div className="mt-8">
        <SortingDrawer containerCss="px-8 mb-8" />
        <Filters.Facets className="" searchOnChange={true}>
          {(facets) =>
            facets.map((f, _i) => {
              if (f.options.length === 0) {
                return null;
              } else if (f.fieldId === "c_usState" || f.fieldId === "c_originCountry") {
                return <FilterTileGroup facet={f} />;
              } else if (f.fieldId === "c_price") {
              }
            })
          }
        </Filters.Facets>
      </div>
    </div>
  ) : (
    <div className="fixed z-20 bottom-0 w-full bg-white flex justify-center items-center h-16 border-t">
      <button
        className="bg-toast-blue w-80 h-10 rounded"
        onClick={() => setFilterSectionActive(true)}
      >
        <p className="text-white text-center font-bold text-base">SORT / FILTER</p>
      </button>
    </div>
  );
};
