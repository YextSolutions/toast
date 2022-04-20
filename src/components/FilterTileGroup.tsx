import { Filters } from "@yext/answers-react-components";
import { DisplayableFacet, Matcher, NumberRangeValue } from "@yext/answers-headless-react";
import { useContext, useRef, useState } from "react";
import classNames from "classnames";
import { useFiltersContext } from "@yext/answers-react-components/lib/components/Filters";
import { SearchCtx } from "../App";

interface FilterTileGroupProps {
  facet: DisplayableFacet;
}

// TODO: remove show more if not enough options
export const FilterTileGroup = ({ facet }: FilterTileGroupProps) => {
  const [expanded, setExpanded] = useState(false);

  const outerContainerRef = useRef<HTMLDivElement>(null);

  const { selectFilter, applyFilters } = useFiltersContext();

  const { setFilterSectionActive } = useContext(SearchCtx);

  const handleChange = (expand: boolean) => {
    outerContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setExpanded(expand);
  };

  const handleTileClick = (
    optionValue: string | number | boolean | NumberRangeValue,
    checked: boolean
  ) => {
    selectFilter({
      matcher: Matcher.Equals,
      fieldId: facet.fieldId,
      value: optionValue,
      selected: checked,
    });
    applyFilters();
    setFilterSectionActive(false);
  };

  return (
    <div className="mb-16">
      <span className="font-bold pl-8">{facet.displayName.toUpperCase()}</span>
      <div
        ref={outerContainerRef}
        key={facet.fieldId}
        className={classNames(
          "px-8 flex flex-wrap mt-6 overflow-hidden transition-max-h duration-200 ease-linear",
          {
            "max-h-36": !expanded,
            "max-h-72 overflow-y-scroll": expanded,
          }
        )}
      >
        <Filters.FilterGroup fieldId={facet.fieldId} defaultExpanded={false}>
          {facet.options.map((o) => (
            <div
              className={classNames(
                "h-10 w-fit border border-toast-orange flex items-center mr-3 mb-3 hover:bg-toast-orange",
                { "bg-toast-orange": o.selected, "bg-toast-light-orange": !o.selected }
              )}
              onClick={() => handleTileClick(o.value, !o.selected)}
            >
              <div className="px-6">
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
