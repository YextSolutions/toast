import { Matcher, useSearchState } from "@yext/search-headless-react";
import { FacetTiles } from "./FacetTiles";
import { PriceSlider } from "./PriceSlider";
import { NumericalFacets } from "@yext/search-ui-react";

export const BeverageFilters = (): JSX.Element => {
  const stateFacet = useSearchState((state) =>
    state.filters.facets?.find((f) => f.fieldId === "c_usState")
  );
  const countryFacet = useSearchState((state) =>
    state.filters.facets?.find((f) => f.fieldId === "c_originCountry")
  );

  return (
    <>
      {stateFacet && stateFacet.options.length > 0 && (
        <FacetTiles facet={stateFacet} label="STATE OF ORIGIN" />
      )}
      {countryFacet && countryFacet.options.length > 0 && (
        <FacetTiles facet={countryFacet} label="COUNTRY OF ORIGIN" />
      )}
      <NumericalFacets
        customCssClasses={{
          numericalFacetsContainer: "mb-8 ml-4",
          optionsContainer: "mt-6",
          optionLabel: "",
          inputContainer: "mt-3",
          input:
            "text-toast-orange border border-gray-300 rounded-sm focus:ring-toast-orange focus:ring-toast-orange focus:border-toast-orange ",
        }}
      />
      <PriceSlider />
    </>
  );
};
