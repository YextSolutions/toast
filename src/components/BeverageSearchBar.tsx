import {
  FocusedItemData,
  isStringOrHighlightedValue,
  SearchBar,
} from "@yext/answers-react-components";
import {
  AutocompleteResult,
  HighlightedValue,
  provideAnswersHeadless,
  Result,
  useAnswersActions,
  useAnswersState,
  VerticalResults as VerticalResultsData,
} from "@yext/answers-headless-react";
import { useEffect, useLayoutEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Divider } from "./Divider";
import classNames from "classnames";
import {
  answersApiKey,
  answersExperienceKey,
  answersSandboxEndpoints,
} from "../config";
import { dataForRender } from "../screens/HomeSearchScreen";
import { StarRating } from "./StarRating";

const searchParamFields = [
  {
    fieldApiName: "c_subType",
    entityType: "ce_beverage",
    fetchEntities: false,
  },
  {
    fieldApiName: "c_subCategory",
    entityType: "ce_beverage",
    fetchEntities: false,
  },
  {
    fieldApiName: "c_category",
    entityType: "ce_beverage",
    fetchEntities: false,
  },
  {
    fieldApiName: "c_type",
    entityType: "ce_beverage",
    fetchEntities: false,
  },
];

export const BeverageSearchBar = () => {
  const entityPreviewSearcher = provideAnswersHeadless({
    headlessId: "entity-preview-searcher",
    apiKey: answersApiKey,
    experienceKey: answersExperienceKey,
    locale: "en",
    endpoints: answersSandboxEndpoints,
    // verticalKey: "beverages",
  });
  const { height, width } = useWindowDimensions();
  const [activeSearch, setActiveSearch] = useState(false);
  const [filters, setFilters] = useState<AutocompleteResult[]>([]);

  const query = useAnswersState((state) => state.query.input);
  const answersActions = useAnswersActions();

  useEffect(() => {
    const fetchFilters = async () => {
      const filters = await answersActions.executeFilterSearch(
        query ?? "",
        false,
        searchParamFields
      );

      setFilters(filters?.sections[0].results ?? []);
    };

    fetchFilters();
  }, [query]);

  const renderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalResultsArray: VerticalResultsData[],
    onSubmit: (
      value: string,
      _index: number,
      itemData?: FocusedItemData
    ) => void
  ) => {
    const verticalResults = verticalResultsArray.flatMap(
      (verticalResult) => verticalResult.results
    );
    return (
      <div className="bg-white">
        {renderFilterAutocomplete(filters)}
        {renderBeveragesAutocomplete(verticalResults)}
      </div>
    );
  };

  const renderBeveragesAutocomplete = (verticalResults: Result[]) =>
    verticalResults.map((verticalResult, i) => {
      const beverageData = dataForRender(verticalResult);
      const beverageImg = verticalResult.rawData.photoGallery?.[0].image.url;
      let beverageTitle: HighlightedValue | string;
      if (
        verticalResult.highlightedFields?.name &&
        isStringOrHighlightedValue(verticalResult.highlightedFields?.name)
      ) {
        beverageTitle = verticalResult.highlightedFields?.name;
      } else {
        beverageTitle = verticalResult.name ?? "";
      }
      return (
        <div id={`bev_${i}`}>
          <div
            className={classNames("flex py-1 items-center", {
              "max-h-28": beverageImg,
            })}
          >
            <div className="w-16">
              <img src={beverageImg} />
            </div>
            <div className="ml-6 text-sm w-80">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    typeof beverageTitle === "string"
                      ? beverageTitle
                      : highlightText(beverageTitle),
                }}
              />
              <div className="font-bold">
                {beverageData.c_priceRange?.split(" ")[0]}
              </div>
              <StarRating />
            </div>
          </div>
          <Divider />
        </div>
      );
    });

  useLayoutEffect(() => {
    console.log(document.activeElement?.id || "no active element");
  }, [document.activeElement]);

  const renderFilterAutocomplete = (results: AutocompleteResult[]) => (
    <div>
      {results.slice(0, 3).map((filter, i) => {
        const filterText = filter.matchedSubstrings
          ? highlightText({
              value: filter.value,
              matchedSubstrings: filter.matchedSubstrings,
            })
          : filter.value;
        return (
          <div id={`filter_${i}`}>
            <div
              className="py-1.5 px-3.5"
              dangerouslySetInnerHTML={{ __html: filterText }}
            />
            <Divider />
          </div>
        );
      })}
    </div>
  );

  // TODO: see if there is an Answers React function for this
  const highlightText = (highlightedValue: HighlightedValue) => {
    const highlightedSection = highlightedValue.value.slice(
      highlightedValue.matchedSubstrings[0].offset,
      highlightedValue.matchedSubstrings[0].offset +
        highlightedValue.matchedSubstrings[0].length
    );

    return highlightedValue.value.replace(
      highlightedSection,
      `<span class="text-toast-dark-orange font-bold">${highlightedSection}</span>`
    );
  };

  return (
    <div
      style={{ maxHeight: `${height - 112}px` }}
      className="overflow-y-scroll z-10 "
      onFocus={() => setActiveSearch(true)}
      onBlur={() => setActiveSearch(false)}
    >
      <SearchBar
        customCssClasses={{
          container: `h-12 mb-6 w-full px-4  mt-2 h-full overflow-y-scroll`,
          inputContainer:
            "inline-flex items-center justify-between w-full rounded-3xl border border-black",
          logoContainer: "w-7 mx-2.5 my-2 ",
          inputDropdownContainer: "relative bg-white w-full overflow-hidden ",
          inputDropdownContainer___active: "",
          optionContainer: "fixed top-[-2000px]",
        }}
        cssCompositionMethod="assign"
        placeholder="Search beer, wine, liqour "
        visualAutocompleteConfig={{
          entityPreviewSearcher,
          renderEntityPreviews,
          entityPreviewsDebouncingTime: 200,
        }}
      />
    </div>
  );
};
