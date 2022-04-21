import { AnswersHeadlessProvider, useAnswersActions } from "@yext/answers-headless-react";
import { useEffect } from "react";
import {
  answersApiKey,
  answersExperienceKey,
  answersSandboxEndpoints,
} from "../config/answersConfig";
import { VerticalResults } from "@yext/answers-react-components";
import { BeverageCarouselCard } from "./BeverageCarouselCard";

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

  useEffect(() => {
    answersActions.setContext({ staticResults: beverageTag });
    answersActions.setVerticalLimit(limit || 8);
    answersActions.executeVerticalQuery();
  }, [beverageTag, limit]);

  return (
    <div className="px-4">
      <div>
        <div className="text-toast-dark-orange text-base font-extrabold">{sectionName}</div>
      </div>{" "}
      <VerticalResults
        customCssClasses={{ results: "overflow-x-auto flex" }}
        CardComponent={BeverageCarouselCard}
        allowPagination={false}
      />
      <button className="flex justify-center items-center bg-toast-blue w-full h-10">
        <div className="text-white font-bold text-xs">VIEW ALL</div>
      </button>
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
