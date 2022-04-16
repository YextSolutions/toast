import { Matcher, SelectableFilter, useAnswersActions } from "@yext/answers-headless-react";
import { VerticalResults } from "@yext/answers-react-components";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { SearchCtx } from "../App";
import BeverageBreadcrumbs from "../components/BeverageBreadcrumbs";
import { BeverageCard } from "../components/BeverageCard";
import { BeverageSearchBar } from "../components/BeverageSearchBar";
import { DeliveryBanner } from "../components/DeliveryBanner";
import { ToastHeader } from "../components/ToastHeader";
import { extractBeverageInfoFromUrl } from "../utils/extractBeverageInfoFromUrl";
import classNames from "classnames";

export const BeverageResultsScreen = () => {
  const [page, setPage] = useState("");

  const urlParams = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const answersActions = useAnswersActions();

  const { active, beverageResultImages } = useContext(SearchCtx);

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

  useEffect(() => {
    setPage(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <>
      <ToastHeader />
      <DeliveryBanner />
      {beverageResultImages[page] && (
        <div className="w-full flex justify-center">
          <div className={classNames("w-full py-4 px-4 max-w-sm")}>
            <img className="w-full" src={beverageResultImages[page]}></img>
          </div>
        </div>
      )}
      {active ? (
        <BeverageSearchBar />
      ) : (
        <>
          <BeverageBreadcrumbs />
          {/* TODO: add more promanent page title under image (either results for or highlighted category) */}
          <VerticalResults
            customCssClasses={{ results: "grid grid-cols-2 sm:grid-cols-3" }}
            CardComponent={BeverageCard}
          />
        </>
      )}
    </>
  );
};
