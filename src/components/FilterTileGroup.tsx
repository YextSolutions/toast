import { Filters } from "@yext/answers-react-components";
import { DisplayableFacet, Matcher, NumberRangeValue } from "@yext/answers-headless-react";
import { useContext, useRef, useState } from "react";
import classNames from "classnames";
import { SearchCtx } from "../App";
import { useSearchParams } from "react-router-dom";
// import { useFiltersContext } from "@yext/answers-react-components/lib/components/Filters/FiltersContext";

interface FilterTileGroupProps {
  facet: DisplayableFacet;
  selectedOptions?: string[];
}

// TODO: remove show more if not enough options
export const FilterTileGroup = ({ facet }: FilterTileGroupProps) => {
  const [expanded, setExpanded] = useState(false);

  const outerContainerRef = useRef<HTMLDivElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const { selectFilter, applyFilters } = Filters.useFiltersContext();

  const { setFilterSectionActive } = useContext(SearchCtx);

  const reorderFacetOptions = (facet: DisplayableFacet): DisplayableFacet => {
    const selectedOptions = facet.options.filter((o) => o.selected);
    const unselectedOptions = facet.options.filter((o) => !o.selected);
    return { ...facet, options: [...selectedOptions, ...unselectedOptions] };
  };

  const handleChange = (expand: boolean) => {
    outerContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setExpanded(expand);
  };

  const handleTileClick = (
    optionValue: string | number | boolean | NumberRangeValue,
    checked: boolean
  ) => {
    const facetParams = searchParams.get("facets");
    let existingUrlFacets: Record<string, string[]> = facetParams ? JSON.parse(facetParams) : {};

    selectFilter({
      matcher: Matcher.Equals,
      fieldId: facet.fieldId,
      value: optionValue,
      selected: checked,
    });
    applyFilters();

    if (checked) {
      if (existingUrlFacets[facet.fieldId]) {
        existingUrlFacets[facet.fieldId].push(optionValue.toString());
      } else {
        existingUrlFacets[facet.fieldId] = [optionValue.toString()];
      }
    } else {
      existingUrlFacets[facet.fieldId] = existingUrlFacets[facet.fieldId].filter(
        (o) => o !== optionValue.toString()
      );
      if (existingUrlFacets[facet.fieldId].length === 0) {
        delete existingUrlFacets[facet.fieldId];
      }
    }

    searchParams.delete("facets");
    searchParams.append("facets", JSON.stringify(existingUrlFacets));
    setSearchParams(searchParams);

    setFilterSectionActive(false);
  };

  return (
    <div className="mb-16 md:pt-4 md:mb-8 ">
      <span className="font-bold pl-8">{facet.displayName.toUpperCase()}</span>
      <div
        ref={outerContainerRef}
        key={facet.fieldId}
        className={classNames(
          "px-8 md:px-0 md:pl-8  flex flex-wrap mt-6 overflow-hidden transition-max-h duration-200 ease-linear",
          {
            "max-h-32 md:max-h-28": !expanded,
            "max-h-72 overflow-y-scroll": expanded,
          }
        )}
      >
        <Filters.FilterGroup fieldId={facet.fieldId} defaultExpanded={false}>
          {reorderFacetOptions(facet).options.map((o) => (
            <div
              className={classNames(
                "w-fit border border-toast-orange flex items-center mr-3 mb-3 hover:bg-toast-orange",
                { "bg-toast-orange": o.selected, "bg-toast-light-orange": !o.selected }
              )}
              onClick={() => handleTileClick(o.value, !o.selected)}
            >
              <div className="px-6 py-1 md:text-xs md:px-3">
                {o.displayName} {o.count && <span className="text-xxs">{`(${o.count})`}</span>}
              </div>
            </div>
          ))}
        </Filters.FilterGroup>
      </div>
      <div className="w-full flex justify-center">
        <button onClick={() => handleChange(!expanded)}>
          <span className="text-sm hover:underline text-toast-dark-orange">
            {expanded ? "Show Less" : "Show More"}
          </span>
        </button>
      </div>
    </div>
  );
};
