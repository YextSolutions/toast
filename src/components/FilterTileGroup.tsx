import { Filters } from "@yext/answers-react-components";
import { DisplayableFacet } from "@yext/answers-headless-react";
import { FilterTileOption } from "./FilterTileOption";
import { useRef, useState } from "react";
import classNames from "classnames";

interface FilterTileGroupProps {
  facet: DisplayableFacet;
}

export const FilterTileGroup = ({ facet }: FilterTileGroupProps) => {
  const [expanded, setExpanded] = useState(false);

  const conatinerRef = useRef<HTMLDivElement>(null);

  const handleChange = (expand: boolean) => {
    conatinerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setExpanded(expand);
  };

  return (
    <div className="mb-16">
      <span className="font-bold pl-8">{facet.displayName.toUpperCase()}</span>
      <div
        ref={conatinerRef}
        key={facet.fieldId}
        className={classNames("px-8 flex flex-wrap mt-6 overflow-hidden ", {
          "max-h-36": !expanded,
          "max-h-72 overflow-y-scroll": expanded,
        })}
      >
        <Filters.FilterGroup fieldId={facet.fieldId} defaultExpanded={false}>
          {facet.options.map((o) => (
            <FilterTileOption key={o.displayName} label={o.displayName} count={o.count} />
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
