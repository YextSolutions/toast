import { useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import {
  useSearchActions,
  Matcher,
  useSearchState,
  DisplayableFacet,
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

    // handles static filters from the url path
    const { categoryA, categoryB, categoryC, categoryD } = urlParams;
    if (categoryD) {
      searchActions.setStaticFilters([getStaticFilterForValue(categoryD)]);
    } else if (categoryC) {
      searchActions.setStaticFilters([getStaticFilterForValue(categoryC)]);
    } else if (categoryB) {
      searchActions.setStaticFilters([getStaticFilterForValue(categoryB)]);
    } else if (categoryA) {
      searchActions.setStaticFilters([getStaticFilterForValue(categoryA)]);
    }

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
