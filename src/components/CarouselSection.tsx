import {
  AnswersHeadlessProvider,
  useAnswersActions,
  useAnswersState,
} from "@yext/answers-headless-react";
import { useEffect } from "react";
import {
  answersApiKey,
  answersExperienceKey,
  answersSandboxEndpoints,
} from "../config/answersConfig";
import { VerticalResults } from "@yext/answers-react-components";
import { BeverageCarouselCard } from "./BeverageCarouselCard";
import { ShakerLoader } from "./ShakerLoader";
import MoonLoader from "react-spinners/MoonLoader";

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
  const answersActions = useAnswersActions();
  const resultsLoading = useAnswersState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    answersActions.setContext({ staticResults: beverageTag });
    answersActions.setVerticalLimit(limit || 8);
    answersActions.executeVerticalQuery();
  }, [beverageTag, limit]);

  return (
    <div className="px-4">
      <div className="flex justify-between">
        <div className="text-toast-dark-orange text-base sm:text-2xl font-extrabold">
          {sectionName}
        </div>
        {!resultsLoading && (
          <button className="hidden md:flex font-bold text-sm text-toast-dark-orange">
            VIEW ALL
          </button>
        )}
      </div>
      {resultsLoading ? (
        <div className="h-60 flex justify-center items-center">
          <MoonLoader color="#FFB563" />
        </div>
      ) : (
        <>
          <VerticalResults
            customCssClasses={{ results: "overflow-x-auto flex" }}
            CardComponent={BeverageCarouselCard}
            allowPagination={false}
          />
          <button className="flex justify-center items-center bg-toast-blue w-full h-10 md:hidden">
            <div className="text-white font-bold text-xs">VIEW ALL</div>
          </button>
        </>
      )}
    </div>
  );
};

export const CarouselSection = ({ sectionName, beverageTag, limit }: CarouselSectionProps) => {
  return (
    <AnswersHeadlessProvider
      headlessId={`${sectionName.replaceAll(" ", "-").toLowerCase()}-carousel`}
      apiKey={answersApiKey}
      experienceKey={answersExperienceKey}
      locale="en"
      endpoints={answersSandboxEndpoints}
      verticalKey="beverages"
    >
      {<Carousel sectionName={sectionName} beverageTag={beverageTag} limit={limit} />}
    </AnswersHeadlessProvider>
  );
};
