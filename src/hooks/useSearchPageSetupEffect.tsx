import { useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useSearchActions, Matcher } from "@yext/search-headless-react";
import formatFilterName from "../utils/formatFilterName";

const pageSearchPageSetupEffect = () => {
  const urlParams = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchActions = useSearchActions();

  useEffect(() => {
    // set query if it's in the url
    const query = searchParams.get("query");
    if (query) {
      searchActions.setQuery(query);
    }

    // set static filters if they're in the url
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

    searchActions.setVerticalLimit(21);
    searchActions.executeVerticalQuery();

    return function cleanup() {
      searchActions.setStaticFilters([]);
      searchActions.resetFacets();
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
