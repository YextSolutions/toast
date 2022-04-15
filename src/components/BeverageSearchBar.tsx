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
} from "../config/answersConfig";
import { StarRating } from "./StarRating";
import { dataForRender } from "../utils/typeUtils";
import { useParams } from "react-router-dom";
import BeverageBreadcrumbs from "./BeverageBreadcrumbs";

const searchParamFields = [
  {
    fieldApiName: "c_subCategory",
    entityType: "ce_beverage",
    fetchEntities: true,
  },
  {
    fieldApiName: "c_category",
    entityType: "ce_beverage",
    fetchEntities: true,
  },
];

export const BeverageSearchBar = () => {
  const entityPreviewSearcher = provideAnswersHeadless({
    headlessId: "entity-preview-searcher",
    apiKey: answersApiKey,
    experienceKey: answersExperienceKey,
    locale: "en",
    endpoints: answersSandboxEndpoints,
  });
  const urlParams = useParams();

  const { height, width } = useWindowDimensions();
  const [activeSearch, setActiveSearch] = useState(false);
  const [autocompleteFilters, setAutocompleteFilters] = useState<AutocompleteResult[]>([]);

  const query = useAnswersState((state) => state.query.input);
  const answersActions = useAnswersActions();

  useEffect(() => {
    const fetchFilters = async () => {
      const filters = await answersActions.executeFilterSearch(
        query ?? "",
        false,
        searchParamFields
      );

      const filterResults = filters?.sections[0]?.results;
      if (filterResults) {
        let filterValueSet: Set<String> = new Set();
        const filters: AutocompleteResult[] = [];
        filterResults.forEach((filter) => {
          if (!filterValueSet.has(filter.value)) {
            filters.push(filter);
          }
          filterValueSet.add(filter.value);
        });
        setAutocompleteFilters(filters);
      } else {
        setAutocompleteFilters([]);
      }
    };

    fetchFilters();
  }, [query]);

  const renderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalResultsArray: VerticalResultsData[],
    onSubmit: (value: string, _index: number, itemData?: FocusedItemData) => void
  ) => {
    if (autocompleteLoading) {
      return <></>;
    }
    const verticalResults = verticalResultsArray.flatMap(
      (verticalResult) => verticalResult.results
    );
    return (
      <div className="bg-white">
        {renderFilterAutocomplete(autocompleteFilters)}
        {renderBeveragesAutocomplete(verticalResults)}
      </div>
    );
  };

  const renderBeveragesAutocomplete = (verticalResults: Result[]) =>
    verticalResults.map((verticalResult) => {
      const beverageData = dataForRender(verticalResult);
      const beverageImg = beverageData.photoGallery?.[0].url;
      let beverageTitle: HighlightedValue | string;
      if (
        verticalResult.highlightedFields?.name &&
        isStringOrHighlightedValue(verticalResult.highlightedFields?.name)
      ) {
        beverageTitle = verticalResult.highlightedFields?.name;
      } else {
        beverageTitle = verticalResult.name ?? "";
      }
      //TODO: Replace with VerticalResults component or provide feedback that I can't with the current component
      return (
        <div>
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
              <div className="font-bold">{beverageData.c_priceRange?.split(" ")[0]}</div>
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
            <div className="py-1.5 px-3.5" dangerouslySetInnerHTML={{ __html: filterText }} />
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
      highlightedValue.matchedSubstrings[0].offset + highlightedValue.matchedSubstrings[0].length
    );

    return highlightedValue.value.replace(
      highlightedSection,
      `<span class="text-toast-dark-orange font-bold">${highlightedSection}</span>`
    );
  };

  return (
    <>
      <BeverageBreadcrumbs />
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
            entityPreviewsDebouncingTime: 300,
          }}
        />
      </div>
    </>
  );
};
