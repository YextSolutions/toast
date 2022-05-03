import { Filters } from "@yext/answers-react-components";
import { FilterTileGroup } from "./FilterTileGroup";

export const BeverageFacets = (): JSX.Element => (
  <Filters.Facets searchOnChange={true}>
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
);
