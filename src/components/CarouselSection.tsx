import {
  SearchHeadlessProvider,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { useEffect } from "react";
import { VerticalResults } from "@yext/search-ui-react";
import { BeverageCarouselCard } from "./BeverageCarouselCard";
// import MoonLoader from "react-spinners/MoonLoader";
import searchConfig from "../config/searchConfig";

export interface CarouselSectionProps {
  id?: string;
  sectionName: string;
  beverageTag: BeverageTag;
  limit?: number;
}

export enum BeverageTag {
  Trending = "TRENDING",
  BestSeller = "BEST_SELLER",
  Gift = "GIFT",
}

const Carousel = ({ sectionName, beverageTag, limit }: CarouselSectionProps) => {
  const searchActions = useSearchActions();
  const resultsLoading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    searchActions.setContext({ staticResults: beverageTag });
    searchActions.setVerticalLimit(limit || 8);
    searchActions.executeVerticalQuery();
  }, [beverageTag, limit]);

  return (
    <div className="px-4">
      <div className="flex justify-between">
        <div className="text-base font-extrabold text-toast-dark-orange sm:text-2xl">
          {sectionName}
        </div>
        {!resultsLoading && (
          <button className="hidden text-sm font-bold text-toast-dark-orange md:flex">
            VIEW ALL
          </button>
        )}
      </div>
      {/* {resultsLoading ? (
        <div className="flex h-60 items-center justify-center">
          <MoonLoader color="#FFB563" />
        </div>
      ) : ( */}
        <>
          <VerticalResults
            customCssClasses={{ verticalResultsContainer: "overflow-x-auto flex" }}
            CardComponent={BeverageCarouselCard}
          />
          <button className="flex h-10 w-full items-center justify-center bg-toast-blue md:hidden">
            <div className="text-xs font-bold text-white">VIEW ALL</div>
          </button>
        </>
      {/* )} */}
    </div>
  );
};

export const CarouselSection = ({ sectionName, beverageTag, limit }: CarouselSectionProps) => {
  return (
    <SearchHeadlessProvider
      headlessId={`${sectionName.replaceAll(" ", "-").toLowerCase()}-carousel`}
      {...searchConfig}
      verticalKey="beverages"
    >
      {<Carousel sectionName={sectionName} beverageTag={beverageTag} limit={limit} />}
    </SearchHeadlessProvider>
  );
};
