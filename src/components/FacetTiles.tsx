import { DisplayableFacet, NumberRangeValue } from "@yext/search-headless-react";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface FacetTilesProps {
  facet: DisplayableFacet;
  label?: string;
}

export const FacetTiles = ({ facet, label }: FacetTilesProps) => {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  const outerContainerRef = useRef<HTMLDivElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (outerContainerRef.current) {
      outerContainerRef.current.scrollHeight > outerContainerRef.current.clientHeight &&
        setCanExpand(true);
    }
  }, [outerContainerRef.current?.clientHeight]);

  const reorderFacetOptions = () => {
    const selectedOptions = facet.options.filter((o) => o.selected);
    const unselectedOptions = facet.options.filter((o) => !o.selected);
    return [...selectedOptions, ...unselectedOptions];
  };

  const handleChange = (expand: boolean) => {
    outerContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setExpanded(expand);
  };

  const handleTileClick = (
    optionValue: string | number | boolean | NumberRangeValue,
    checked: boolean
  ) => {
    if (checked) {
      if (searchParams.has(facet.fieldId)) {
        const values = searchParams.getAll(facet.fieldId);
        values.push(optionValue.toString());
        searchParams.set(facet.fieldId, values.toString());
      } else {
        searchParams.set(facet.fieldId, [optionValue.toString()].toString());
      }
    } else {
      if (
        searchParams.has(facet.fieldId) &&
        searchParams.get(facet.fieldId)?.split(",").length === 1
      ) {
        searchParams.delete(facet.fieldId);
      } else {
        const values = searchParams.get(facet.fieldId)?.split(",") ?? [];
        const newValues = values.filter((v) => v !== optionValue.toString());
        searchParams.set(facet.fieldId, newValues.toString());
      }
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-8">
      <span className="font-bold ">{label ?? facet.displayName.toUpperCase()}</span>
      <div
        ref={outerContainerRef}
        key={facet.fieldId}
        className={classNames(
          " mt-6 flex  flex-wrap overflow-hidden px-4 transition-max-h duration-200 ease-linear md:px-0",
          {
            "max-h-32 md:max-h-28": !expanded,
            "max-h-72 overflow-y-scroll": expanded,
          }
        )}
      >
        {reorderFacetOptions().map((o, i) => (
          <div
            key={uuidv4()}
            className={classNames(
              "mr-3 mb-3 flex w-fit items-center border border-toast-orange md:hover:bg-toast-orange",
              { "bg-toast-orange": o.selected, "bg-toast-light-orange": !o.selected }
            )}
            onClick={() => handleTileClick(o.value, !o.selected)}
          >
            <div className="px-6 py-1 md:px-3 md:text-xs">
              {o.displayName} {o.count && <span className="text-xxs">{`(${o.count})`}</span>}
            </div>
          </div>
        ))}
      </div>
      {canExpand && (
        <div className="flex w-full justify-center">
          <button onClick={() => handleChange(!expanded)}>
            <span className="text-sm text-toast-dark-orange hover:underline">
              {expanded ? "Show Less" : "Show More"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
