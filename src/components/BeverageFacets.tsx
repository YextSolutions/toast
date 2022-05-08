import { Matcher } from "@yext/answers-headless-react";
import { Filters } from "@yext/answers-react-components";
import { FacetTiles } from "./FacetTiles";
import { PriceSlider } from "./PriceSlider";

export const BeverageFacets = (): JSX.Element => {
  return (
    <Filters.Facets searchOnChange={true}>
      {(facets) => {
        const stateFacet = facets.find((facet) => facet.fieldId === "c_usState");
        const countryFacet = facets.find((facet) => facet.fieldId === "c_originCountry");
        const abvFacet = facets.find((facet) => facet.fieldId === "c_abv");

        return (
          <>
            {stateFacet && stateFacet.options.length > 0 && (
              <FacetTiles facet={stateFacet} label="STATE OF ORIGIN" />
            )}
            {countryFacet && countryFacet.options.length > 0 && (
              <FacetTiles facet={countryFacet} label="COUNTRY OF ORIGIN" />
            )}
            {abvFacet && (
              <Filters.FilterGroup fieldId="c_abv">
                <div className="mb-8 ml-4">
                  <div className="mb-6 font-bold">ABV</div>
                  {abvFacet.options.map((o, _i) => (
                    <Filters.CheckboxOption
                      label={`${o.displayName} (${o.count})`}
                      value={o.value}
                      matcher={Matcher.Between}
                      customCssClasses={{
                        label: "text-neutral md:text-sm text-base  font-normal cursor-pointer",
                        input:
                          "w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-toast-orange focus:ring-toast-orange",
                      }}
                      cssCompositionMethod="assign"
                    />
                  ))}
                </div>
              </Filters.FilterGroup>
            )}
            <PriceSlider />
          </>
        );
      }}
    </Filters.Facets>
  );
};
