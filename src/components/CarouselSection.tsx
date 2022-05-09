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
        <div className="text-base font-extrabold text-toast-dark-orange sm:text-2xl">
          {sectionName}
        </div>
        {!resultsLoading && (
          <button className="hidden text-sm font-bold text-toast-dark-orange md:flex">
            VIEW ALL
          </button>
        )}
      </div>
      {resultsLoading ? (
        <div className="flex h-60 items-center justify-center">
          <MoonLoader color="#FFB563" />
        </div>
      ) : (
        <>
          <VerticalResults
            customCssClasses={{ results: "overflow-x-auto flex" }}
            CardComponent={BeverageCarouselCard}
            allowPagination={false}
          />
          <button className="flex h-10 w-full items-center justify-center bg-toast-blue md:hidden">
            <div className="text-xs font-bold text-white">VIEW ALL</div>
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
