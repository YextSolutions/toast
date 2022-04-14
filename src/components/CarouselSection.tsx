import { v4 as uuid } from "uuid";
import {
  AnswersHeadlessProvider,
  useAnswersActions,
  useAnswersState,
} from "@yext/answers-headless-react";
import { useEffect, useState } from "react";
import ImageAssets from "../assets/imageAssets";
import {
  answersApiKey,
  answersExperienceKey,
  answersSandboxEndpoints,
} from "../config/answersConfig";
import { Beverage, dataForRender } from "../utils/typeUtils";

export interface CarouselSectionProps {
  id?: string;
  sectionName: string;
  beverageTag: BeverageTag;
  limit?: number;
}

export enum BeverageTag {
  Trending = "TRENDING",
  BestSeller = "BEST SELLER",
  Gift = "GIFT",
}

// TODO: add spinner for carousels or use less cards
const Carousel = ({
  sectionName,
  beverageTag,
  limit,
}: CarouselSectionProps) => {
  const answersActions = useAnswersActions();
  const verticalResults = useAnswersState((state) => state.vertical.results);

  useEffect(() => {
    answersActions.setContext({ staticResults: "TRENDING" });
    answersActions.executeVerticalQuery();
  }, []);

  return (
    <div className="px-4">
      <div>
        <div className="text-toast-dark-orange text-base font-extrabold">
          {sectionName}
        </div>
      </div>

      <div className="overflow-x-auto flex">
        {verticalResults &&
          verticalResults.map((result) => {
            const beverage = dataForRender(result);
            return (
              <div key={`item_${uuid()}`} className="flex flex-col">
                <div className="border border-toast-dark-orange bg-toast-light-orange mx-1">
                  <div className="w-52 h-40 flex justify-center items-center">
                    {/* TODO: replace with actual image */}
                    <img className="" src={ImageAssets.titos} />
                  </div>
                </div>
                <div className="mt-2 mb-6">
                  <div className="font-semibold text-xxs">{beverage.name}</div>
                  <div className="text-xxs">
                    {beverage.c_priceRange?.split(" ")[0]}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <button className="flex justify-center items-center bg-toast-blue w-full h-10">
        <div className="text-white font-bold text-xs">VIEW ALL</div>
      </button>
    </div>
  );
};

export const CarouselSection = ({
  sectionName,
  beverageTag,
  limit,
}: CarouselSectionProps) => {
  return (
    <AnswersHeadlessProvider
      headlessId={`${sectionName}-carousel`}
      apiKey={answersApiKey}
      experienceKey={answersExperienceKey}
      locale="en"
      endpoints={answersSandboxEndpoints}
      verticalKey="beverages"
    >
      <Carousel
        sectionName={sectionName}
        beverageTag={beverageTag}
        limit={limit}
      />
    </AnswersHeadlessProvider>
  );
};
