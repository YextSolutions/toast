import {
  DisplayableFacet,
  Matcher,
  SelectableFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { Pagination, VerticalResults } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import BeverageBreadcrumbs from "../components/BeverageBreadcrumbs";
import { BeverageCard } from "../components/BeverageCard";
import { extractBeverageInfoFromUrl } from "../utils/extractBeverageInfoFromUrl";
import classNames from "classnames";
import { FilterOverlay } from "../components/FilterOverlay";
import { SortingDrawer } from "../components/SortingDrawer";
import { ShakerLoader } from "../components/ShakerLoader";
import { formatSearchResultsTitle } from "../utils/formatSearchResultsTitle";
import { BeverageFilters } from "../components/BeverageFilters";
import { PageLayout } from "./PageLayout";
import { getSearchPageImage } from "../utils/getSearchPageImage";
import Beverage from "../types/beverages";
import useSearchPageSetupEffect from "../hooks/useSearchPageSetupEffect";

export const BeverageResultsPage = (): JSX.Element => {
  const [page, setPage] = useState("");
  const [searchResultsTitle, setSearchResultsTitle] = useState("");

  const urlParams = useParams();
  const [searchParams] = useSearchParams();

  const searchActions = useSearchActions();
  const resultsCount = useSearchState((state) => state.vertical.resultsCount);
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  const mostRecentSearch = useSearchState((state) => state.query.mostRecentSearch);
  const activeFilters = useSearchState((state) => state.filters.static);

  useSearchPageSetupEffect();

  useEffect(() => {
    if (activeFilters && activeFilters[0]) {
      setSearchResultsTitle(activeFilters[0].displayName ?? (activeFilters[0].value as string));
    } else if (mostRecentSearch) {
      setSearchResultsTitle(mostRecentSearch);
    }
  }, [mostRecentSearch, activeFilters]);

  const renderSearchResultsTitle = (): JSX.Element => {
    return (
      <div className={classNames("mr-1.5  py-2 text-3xl font-bold")}>
        <span className="border-b-2 border-toast-dark-orange">{`Results for ${searchResultsTitle}`}</span>
      </div>
    );
  };
  // useEffect(() => {
  //   handleUrlFacets();
  // }, []);

  // useEffect(() => {
  //   setPage(location.pathname.split("/")[1]);

  //   const selectedFilters: SelectableFilter[] = [];
  //   selectedFilters.push(...extractBeverageStaticFiltersFromUrlParams());
  //   const priceFilter = extractPriceRangeFilterFromSearchParams();
  //   priceFilter && selectedFilters.push(priceFilter);

  //   handleSearchParams();

  //   searchActions.setStaticFilters(selectedFilters);

  //   searchActions.setVerticalLimit(21);
  //   searchActions.executeVerticalQuery();
  // }, [searchParams]);

  const extractBeverageStaticFiltersFromUrlParams = (): SelectableFilter[] => {
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
      if (!query) {
        !query && setSearchResultsTitle({ title: formatSearchResultsTitle(category) });
      }
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

    return selectedFilters;
  };

  const extractPriceRangeFilterFromSearchParams = (): SelectableFilter | undefined => {
    if (!searchParams.has("priceRange")) return;

    const priceRange = JSON.parse(searchParams.get("priceRange") as string) as {
      min: number;
      max?: number;
    };

    if (priceRange.max) {
      return {
        selected: true,
        fieldId: "c_price",
        value: {
          start: { matcher: Matcher.GreaterThanOrEqualTo, value: priceRange.min },
          end: { matcher: Matcher.LessThanOrEqualTo, value: priceRange.max },
        },
        matcher: Matcher.Between,
      };
    } else {
      return {
        selected: true,
        fieldId: "c_price",
        value: priceRange.min,
        matcher: Matcher.GreaterThanOrEqualTo,
      };
    }
  };

  const handleSearchParams = () => {
    const query = searchParams.get("query");
    const sortBy = searchParams.get("sortBy");

    if (query) {
      searchActions.setQuery(query);
      setSearchResultsTitle({ query: true, title: `Results for ${query}` });
    } else {
      searchActions.setQuery("");
    }

    sortBy && searchActions.setSortBys([JSON.parse(sortBy)]);
  };

  const handleUrlFacets = () => {
    if (searchParams.has("facets")) {
      const urlFacets = JSON.parse(searchParams.get("facets") as string) as Record<
        string,
        string[]
      >;

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
      searchActions.setFacets(facets);
    } else {
      searchActions.setFacets([]);
    }
  };

  return (
    <PageLayout>
      <div className="flex h-full justify-center">
        <div className="absolute top-28 bottom-16 w-full max-w-7xl overflow-auto px-4 md:bottom-0">
          {
            <div className="flex justify-center">
              <div className="py-8">
                <img
                  className="h-44 w-96 sm:h-[21.75rem] sm:w-[42.75rem]"
                  src={getSearchPageImage(page)}
                ></img>
              </div>
            </div>
          }
          {isLoading ? (
            <ShakerLoader />
          ) : (
            <>
              {!mostRecentSearch && (
                <div className="my-4 px-4 text-sm">
                  <BeverageBreadcrumbs />
                </div>
              )}
              <div className="flex items-center justify-between px-4">
                <div className="my-2 ">
                  {renderSearchResultsTitle()}
                  {!isLoading && <div className="mt-1 text-sm">{`(${resultsCount} results)`}</div>}
                </div>
                <SortingDrawer containerCss="hidden md:flex" />
              </div>

              <div className="flex">
                <div className="hidden w-1/3 pr-8 pb-0 md:block md:pb-4">
                  <BeverageFilters />
                </div>
                <div>
                  <VerticalResults<Beverage>
                    customCssClasses={{
                      verticalResultsContainer: "grid grid-cols-2 md:grid-cols-3 gap-4",
                    }}
                    CardComponent={BeverageCard}
                  />
                  <Pagination />
                </div>
              </div>
            </>
          )}
        </div>
        <FilterOverlay />
      </div>
    </PageLayout>
  );
};
