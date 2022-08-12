import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  useSearchActions,
  Matcher,
  useSearchState,
  DisplayableFacet,
  SelectableFilter,
} from "@yext/search-headless-react";
import formatFilterName from "../utils/formatFilterName";
import sortConfig from "../config/sortConfig";

const pageSearchPageSetupEffect = () => {
  const urlParams = useParams();
  const [searchParams] = useSearchParams();
  const searchActions = useSearchActions();
  const facets = useSearchState((state) => state.filters.facets);

  useEffect(() => {
    // handles the search query
    const query = searchParams.get("query");
    if (query) {
      searchActions.setQuery(query);
    }

    const selectedFilters: SelectableFilter[] = [];

    // handles static filters from the url path
    const { categoryA, categoryB, categoryC, categoryD } = urlParams;
    if (categoryD) {
      selectedFilters.push(getStaticFilterForValue(categoryD));
    } else if (categoryC) {
      selectedFilters.push(getStaticFilterForValue(categoryC));
    } else if (categoryB) {
      selectedFilters.push(getStaticFilterForValue(categoryB));
    } else if (categoryA) {
      selectedFilters.push(getStaticFilterForValue(categoryA));
    }

    // handles price range filter from the url path
    const priceParam = searchParams.get("price");
    if (priceParam) {
      const priceRange = priceParam.split("-");
      if (priceRange.length === 1) {
        selectedFilters.push({
          selected: true,
          fieldId: "c_price",
          value: Number.parseInt(priceRange[0]),
          matcher: Matcher.GreaterThanOrEqualTo,
        });
      } else if (priceRange.length == 2) {
        selectedFilters.push({
          selected: true,
          fieldId: "c_price",
          value: {
            start: { matcher: Matcher.GreaterThanOrEqualTo, value: Number.parseInt(priceRange[0]) },
            end: { matcher: Matcher.LessThanOrEqualTo, value: Number.parseInt(priceRange[1]) },
          },
          matcher: Matcher.Between,
        });
      }
    }

    searchActions.setStaticFilters(selectedFilters);

    // handles the facets from the url query params
    const fieldIds = facets?.map((facet) => facet.fieldId);
    const selectedFacets: DisplayableFacet[] = [];
    fieldIds?.forEach((fieldId) => {
      if (searchParams.has(fieldId)) {
        const options = searchParams
          .get(fieldId)
          ?.split(",")
          .map((value) => ({
            value,
            displayName: "bluh",
            count: 0,
            selected: true,
            matcher: Matcher.Equals,
          }));
        selectedFacets.push({ fieldId, displayName: "bluh", options: options ?? [] });
      }
    });
    searchActions.setFacets(selectedFacets);

    //handles the sortBy from the url query params
    const sortByKey = searchParams.get("sortBy");
    if (sortByKey && sortConfig[sortByKey]) {
      searchActions.setSortBys([sortConfig[sortByKey].sortBy]);
    }

    searchActions.setVerticalLimit(21);
    searchActions.executeVerticalQuery();

    return function cleanup() {
      searchActions.resetFacets();
      searchActions.setSortBys([]);
      searchActions.setQuery("");
    };
  }, [urlParams, searchParams, searchActions]);
};

export default pageSearchPageSetupEffect;

const getStaticFilterForValue = (value: string) => {
  return {
    selected: true,
    fieldId: "c_beverageCategories.name",
    value: formatFilterName(value),
    matcher: Matcher.Equals,
  };
};
