import { Matcher, SelectableFilter, useAnswersActions } from "@yext/answers-headless-react";
import { VerticalResults } from "@yext/answers-react-components";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BeverageCard } from "../components/BeverageCard";
import { BeverageSearchBar } from "../components/BeverageSearchBar";
import { extractBeverageInfoFromUrl } from "../utils/extractBeverageInfoFromUrl";

export const BeverageResultsScreen = () => {
  const urlParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const answersActions = useAnswersActions();

  useEffect(() => {
    const { alcoholType, category, subCategory } = extractBeverageInfoFromUrl(urlParams);
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
      alcoholType !== "all" &&
      selectedFilters.push({
        selected: true,
        fieldId: "c_category",
        value: category.replaceAll("-", " "),
        matcher: Matcher.Equals,
      });

    subCategory &&
      selectedFilters.push({
        selected: true,
        fieldId: "c_subCategory",
        value: subCategory.replaceAll("-", " "),
        matcher: Matcher.Equals,
      });

    answersActions.setStaticFilters(selectedFilters);
    answersActions.executeVerticalQuery();
    answersActions.setStaticFilters([]);
  }, [urlParams]);

  return (
    <>
      <BeverageSearchBar />
      <VerticalResults
        customCssClasses={{ results: "grid grid-cols-2 sm:grid-cols-3" }}
        CardComponent={BeverageCard}
      />
    </>
  );
};
