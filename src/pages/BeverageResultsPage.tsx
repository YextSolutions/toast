import { useSearchState } from "@yext/search-headless-react";
import { Pagination, VerticalResults } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import BeverageBreadcrumbs from "../components/BeverageBreadcrumbs";
import { BeverageCard } from "../components/BeverageCard";
import classNames from "classnames";
import { FilterOverlay } from "../components/FilterOverlay";
import { SortingDrawer } from "../components/SortingDrawer";
import { ShakerLoader } from "../components/ShakerLoader";
import { BeverageFilters } from "../components/BeverageFilters";
import { PageLayout } from "./PageLayout";
import { getSearchPageImage } from "../utils/getSearchPageImage";
import Beverage from "../types/beverages";
import useSearchPageSetupEffect from "../hooks/useSearchPageSetupEffect";

export const BeverageResultsPage = (): JSX.Element => {
  const [page, setPage] = useState("");
  const [searchResultsTitle, setSearchResultsTitle] = useState("");

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
              <div className="my-4 px-4 text-sm">
                <BeverageBreadcrumbs />
              </div>
              <div className="flex items-center justify-between px-4">
                <div className="my-2 ">
                  {renderSearchResultsTitle()}
                  <div className="mt-1 text-sm">{`(${resultsCount} results)`}</div>
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
