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
import { MobileFilterScreen } from "./MobileFilterScreen";
import { SortingDrawer } from "../components/SortingDrawer";
import { ShakerLoader } from "../components/ShakerLoader";
import { formatSearchResultsTitle } from "../utils/formatSearchResultsTitle";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { BeverageFacets } from "../components/BeverageFacets";

export const BeverageResultsScreen = (): JSX.Element => {
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

  const { height } = useWindowDimensions();

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
    <div className="relative h-full w-full flex justify-center">
      <ToastHeader />
      {active ? (
        <div
          className="absolute top-16 w-full bg-white overflow-y-scroll"
          style={{ maxHeight: `${height - 64}px` }}
        >
          <BeverageSearchBar />
        </div>
      ) : (
        <>
          <div className="fixed top-28 bottom-16 md:bottom-0 overflow-auto w-full max-w-7xl px-4">
            {beverageResultImages[page] && (
              <div className="flex justify-center">
                <div className="py-8">
                  <img
                    className="sm:w-[42.75rem] sm:h-[21.75rem] w-96 h-44"
                    src={beverageResultImages[page]}
                  ></img>
                </div>
              </div>
            )}
            <div className="my-4 px-4 text-sm">
              <BeverageBreadcrumbs />
            </div>
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
              <div className="flex">
                <div className="w-1/3 hidden md:block">
                  <BeverageFacets />
                </div>
                <div>
                  <VerticalResults
                    customCssClasses={{ results: "grid grid-cols-2 sm:grid-cols-3 gap-4" }}
                    CardComponent={BeverageCard}
                  />
                </div>
              </div>
            )}
          </div>
          <MobileFilterScreen />
        </>
      )}
    </div>
  );
};
