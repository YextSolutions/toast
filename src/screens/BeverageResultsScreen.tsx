import {
  DisplayableFacet,
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
import { ToastHeader } from "../components/ToastHeader";
import { extractBeverageInfoFromUrl } from "../utils/extractBeverageInfoFromUrl";
import classNames from "classnames";
import { FilterSection } from "../components/FilterSection";
import { SortingDrawer } from "../components/SortingDrawer";
import { ShakerLoader } from "../components/ShakerLoader";
import { formatSearchResultsTitle } from "../utils/formatSearchResultsTitle";

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
  const isLoading = useAnswersState((state) => state.searchStatus.isLoading);

  const { searchBarActive: active, beverageResultImages } = useContext(SearchCtx);

  useEffect(() => {
    searchParams.get("facets") &&
      handleUrlFacets(JSON.parse(searchParams.get("facets") as string) as Record<string, string[]>);
  }, []);

  useEffect(() => {
    setPage(location.pathname.split("/")[1]);

    const { alcoholType, category, subCategory } = extractBeverageInfoFromUrl(urlParams);
    const query = searchParams.get("query");

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
          title: formatSearchResultsTitle(alcoholType),
        });
    }

    if (category && category !== "all") {
      selectedFilters.push({
        selected: true,
        fieldId: "c_category",
        value: category.replaceAll("-", " "),
        matcher: Matcher.Equals,
      });
      !query && setSearchResultsTitle({ title: formatSearchResultsTitle(category) });
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
          title: formatSearchResultsTitle(subCategory),
        });
    }

    handleSearchParams();

    answersActions.setStaticFilters(selectedFilters);

    answersActions.executeVerticalQuery();
  }, [urlParams]);

  const handleSearchParams = () => {
    const query = searchParams.get("query");
    const sortBy = searchParams.get("sortBy");

    if (query) {
      answersActions.setQuery(query);
      setSearchResultsTitle({ query: true, title: `Results for ${query}` });
    } else {
      answersActions.setQuery("");
    }

    sortBy && answersActions.setSortBys([JSON.parse(sortBy)]);
  };

  const handleUrlFacets = (urlFacets: Record<string, string[]>) => {
    const facets: DisplayableFacet[] = [];
    Object.entries(urlFacets).forEach(([key, values]) => {
      facets.push({
        fieldId: key,
        displayName: "bluh",
        options: values.map((o) => ({
          value: o,
          matcher: Matcher.Equals,
          displayName: "bluh",
          count: 0,
          selected: true,
        })),
      });
    });
    answersActions.setFacets(facets);
  };

  return (
    <>
      <ToastHeader />
      {active ? (
        <BeverageSearchBar />
      ) : (
        <>
          <div className="fixed top-28 bottom-16 overflow-auto w-full ">
            {beverageResultImages[page] && (
              <div className="flex justify-center">
                <div className={" py-4 px-4 max-w-sm"}>
                  <img className="w-96 h-44" src={beverageResultImages[page]}></img>
                </div>
              </div>
            )}
            <BeverageBreadcrumbs />
            <div className="flex justify-between items-center px-4">
              <div className="my-2 ">
                <div
                  className={classNames("mr-1.5 text-3xl font-bold", {
                    "text-toast-dark-orange  ": !searchResultsTitle.query,
                  })}
                >
                  {searchResultsTitle.title}
                </div>
                {!isLoading && <div className="text-sm mt-1">{`(${resultsCount} results)`}</div>}
              </div>
              <SortingDrawer />
            </div>
            {isLoading ? (
              <ShakerLoader />
            ) : (
              <VerticalResults
                customCssClasses={{ results: "grid grid-cols-2 sm:grid-cols-3" }}
                CardComponent={BeverageCard}
              />
            )}
          </div>
          <FilterSection />
        </>
      )}
    </>
  );
};
