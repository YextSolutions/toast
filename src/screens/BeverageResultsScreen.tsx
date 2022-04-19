import {
  Matcher,
  SelectableFilter,
  useAnswersActions,
  useAnswersState,
} from "@yext/answers-headless-react";
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
  const [searchResultsTitle, setSearchResultsTitle] = useState<{ query?: boolean; title: string }>({
    title: "",
  });

  const urlParams = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const answersActions = useAnswersActions();
  const resultsCount = useAnswersState((state) => state.vertical.resultsCount);

  const { active, beverageResultImages } = useContext(SearchCtx);

  useEffect(() => {
    const { alcoholType, category, subCategory } = extractBeverageInfoFromUrl(urlParams);
    const query = searchParams.get("query");

    if (query) {
      answersActions.setQuery(query);
      setSearchResultsTitle({ query: true, title: `Results for ${query}` });
    } else {
      answersActions.setQuery("");
    }

    const selectedFilters: SelectableFilter[] = [];

    if (alcoholType) {
      selectedFilters.push({
        selected: true,
        fieldId: "c_alcoholType",
        value: alcoholType,
        matcher: Matcher.Equals,
      });
      !query &&
        setSearchResultsTitle({
          title: alcoholType.charAt(0).toUpperCase() + alcoholType.slice(1),
        });
    }

    if (category && category !== "all") {
      selectedFilters.push({
        selected: true,
        fieldId: "c_category",
        value: category.replaceAll("-", " "),
        matcher: Matcher.Equals,
      });
      !query &&
        setSearchResultsTitle({ title: category.charAt(0).toUpperCase() + category.slice(1) });
    }

    if (subCategory) {
      selectedFilters.push({
        selected: true,
        fieldId: "c_subCategory",
        value: subCategory.replaceAll("-", " "),
        matcher: Matcher.Equals,
      });
      !query &&
        setSearchResultsTitle({
          title: subCategory.charAt(0).toUpperCase() + subCategory.slice(1),
        });
    }

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
      {active ? (
        <BeverageSearchBar />
      ) : (
        <>
          <DeliveryBanner />
          {beverageResultImages[page] && (
            <div className="w-full flex justify-center">
              <div className={" py-4 px-4 max-w-sm"}>
                <img className="w-96 h-44" src={beverageResultImages[page]}></img>
              </div>
            </div>
          )}
          <BeverageBreadcrumbs />
          <div className="my-2 px-4">
            <span
              className={classNames("mr-1.5 text-3xl font-bold", {
                "text-toast-dark-orange  ": !searchResultsTitle.query,
              })}
            >
              {searchResultsTitle.title}
            </span>
            {`(${resultsCount} results)`}
          </div>
          <VerticalResults
            customCssClasses={{ results: "grid grid-cols-2 sm:grid-cols-3" }}
            CardComponent={BeverageCard}
          />
        </>
      )}
    </>
  );
};
