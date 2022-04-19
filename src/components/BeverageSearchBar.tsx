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
import { useContext, useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Divider } from "./Divider";
import classNames from "classnames";
import {
  answersApiKey,
  answersExperienceKey,
  answersSandboxEndpoints,
} from "../config/answersConfig";
import { StarRating } from "./StarRating";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { dataForRender } from "./BeverageCard";
import { SearchCtx } from "../App";

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
  const { setSearchBarActive } = useContext(SearchCtx);

  const navigate = useNavigate();

  const { height } = useWindowDimensions();
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
      const beverageImg = beverageData.photoGallery?.[0].image.url;
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
        <>
          <div
            className={classNames("flex py-1 items-center hover:bg-toast-gray", {
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
        </>
      );
    });

  const renderFilterAutocomplete = (results: AutocompleteResult[]) => {
    return (
      <div>
        {results.slice(0, 3).map((filter, i) => {
          const filterText = filter.matchedSubstrings
            ? highlightText({
                value: filter.value,
                matchedSubstrings: filter.matchedSubstrings,
              })
            : filter.value;

          const relatedBeverage = dataForRender(filter.relatedItem);
          const path = generatePath(
            filter.value,
            relatedBeverage.c_alcoholType,
            relatedBeverage.c_category,
            relatedBeverage.c_subCategory
          );

          return (
            <div className="hover:bg-toast-gray" onClick={() => searchHandler(path)}>
              <div className="py-1.5 px-3.5" dangerouslySetInnerHTML={{ __html: filterText }} />
              <Divider />
            </div>
          );
        })}
      </div>
    );
  };

  const generatePath = (
    filterValue?: string,
    alcoholType?: string,
    category?: string,
    subCategory?: string
  ): string => {
    if (!alcoholType) return "";

    let link = `/${alcoholType.toLowerCase()}`;
    if (category) {
      link += `/${category.toLowerCase().replaceAll(" ", "-")}`;
      if (subCategory && filterValue !== category) {
        link += `/${subCategory.toLowerCase().replaceAll(" ", "-")}`;
      }
      return link;
    } else {
      return link + "/all";
    }
  };

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

  const searchHandler = (path: string) => {
    console.log(path);
    setSearchBarActive(false);
    navigate(path);
  };

  const handleSubmit = (searchEventData: { verticalKey?: string; query?: string }) => {
    console.log("search button clicked");
    const { query } = searchEventData;
    searchHandler(`/search?query=${query}`);
  };

  return (
    // TODO: replace with Tailwind theme function
    <div
      className="absolute top-16 w-full  bg-white overflow-y-scroll"
      style={{ maxHeight: `${height - 64}px` }}
    >
      <SearchBar
        customCssClasses={{
          container: `relative mb-6 w-full px-4 py-2 h-full overflow-y-scroll`,
          inputContainer:
            "inline-flex items-center justify-between w-full rounded-3xl border border-black",
          logoContainer: "w-7 mx-2.5 my-2 ",
          inputDropdownContainer: "relative bg-white w-full  ",
          inputDropdownContainer___active: "",
          optionContainer: "fixed top-[-2000px]",
        }}
        cssCompositionMethod="assign"
        onSearch={handleSubmit}
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
