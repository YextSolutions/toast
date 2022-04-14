import {
  Matcher,
  SelectableFilter,
  useAnswersActions,
} from "@yext/answers-headless-react";
import { VerticalResults } from "@yext/answers-react-components";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BeverageCard } from "../components/BeverageCard";
import { BeverageSearchBar } from "../components/BeverageSearchBar";

export const BeverageResultsScreen = () => {
  const urlParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const answersActions = useAnswersActions();

  useEffect(() => {
    const alcoholType = urlParams.alcoholType;
    const category = urlParams.category;
    const subCategory = urlParams.subcategory;
    const query = searchParams.get("query");

    answersActions.setQuery(query ?? "");

    const selectedFilters: SelectableFilter[] = [];

    alcoholType &&
      selectedFilters.push({
        selected: true,
        fieldId: "c_alcoholType",
        value: alcoholType,
        matcher: Matcher.Equals,
      });

    category &&
      selectedFilters.push({
        selected: true,
        fieldId: "c_category",
        value: category,
        matcher: Matcher.Equals,
      });

    subCategory &&
      selectedFilters.push({
        selected: true,
        fieldId: "c_subCategory",
        value: subCategory,
        matcher: Matcher.Equals,
      });

    answersActions.setStaticFilters(selectedFilters);
    answersActions.executeVerticalQuery();
  }, []);

  return (
    <>
      <BeverageSearchBar />
      {/* <VerticalResults CardComponent={BeverageCard} /> */}
      HELLO!!!!
    </>
  );
};
