import {
  DisplayableFacet,
  Matcher,
  SelectableFilter,
  useAnswersActions,
  useAnswersState,
} from "@yext/answers-headless-react";
import { VerticalResults } from "@yext/answers-react-components";
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

export const BeverageResultsPage = (): JSX.Element => {
  const [page, setPage] = useState("");
  const [searchResultsTitle, setSearchResultsTitle] = useState<{ query?: boolean; title: string }>({
    title: "",
  });

  const urlParams = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const answersActions = useAnswersActions();
  const resultsCount = useAnswersState((state) => state.vertical.resultsCount);
  const isLoading = useAnswersState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    handleUrlFacets();
  }, []);

  useEffect(() => {
    setPage(location.pathname.split("/")[1]);

    const selectedFilters: SelectableFilter[] = [];
    selectedFilters.push(...extractBeverageStaticFiltersFromUrlParams());
    const priceFilter = extractPriceRangeFilterFromSearchParams();
    priceFilter && selectedFilters.push(priceFilter);

    handleSearchParams();

    answersActions.setStaticFilters(selectedFilters);

    answersActions.setVerticalLimit(21);
    answersActions.executeVerticalQuery();
  }, [searchParams]);

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
      answersActions.setQuery(query);
      setSearchResultsTitle({ query: true, title: `Results for ${query}` });
    } else {
      answersActions.setQuery("");
    }

    sortBy && answersActions.setSortBys([JSON.parse(sortBy)]);
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
      answersActions.setFacets(facets);
    } else {
      answersActions.setFacets([]);
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
          <div className="my-4 px-4 text-sm">
            <BeverageBreadcrumbs />
          </div>
          <div className="flex items-center justify-between px-4">
            <div className="my-2 ">
              <div
                className={classNames("mr-1.5 text-3xl font-bold", {
                  "text-toast-dark-orange": !searchResultsTitle.query,
                })}
              >
                {searchResultsTitle.title}
              </div>
              {!isLoading && <div className="mt-1 text-sm">{`(${resultsCount} results)`}</div>}
            </div>
            <SortingDrawer />
          </div>
          {isLoading ? (
            <ShakerLoader />
          ) : (
            <div className="flex">
              <div className="hidden w-1/3 md:block">
                <BeverageFilters />
              </div>
              <div>
                <VerticalResults
                  customCssClasses={{
                    results: "grid grid-cols-2 md:grid-cols-3 gap-4",
                    paginationContainer: "pb-8",
                  }}
                  CardComponent={BeverageCard}
                />
              </div>
            </div>
          )}
        </div>
        <FilterOverlay />
      </div>
    </PageLayout>
  );
};
