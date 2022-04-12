import {
  AutocompleteResult,
  FilterSearchResponse,
  provideAnswersHeadless,
  Result,
  useAnswersActions,
  useAnswersState,
  VerticalResults as VerticalResultsData,
} from "@yext/answers-headless-react";
import {
  FocusedItemData,
  SearchBar,
  VerticalResults,
  StandardCard,
} from "@yext/answers-react-components";
import { renderAutocompleteResult } from "@yext/answers-react-components/lib/components/utils/renderAutocompleteResult";
import { answersSandboxEndpoints } from "../main";
import { useEffect, useState } from "react";

const renderEntityPreviews = {
  autocompleteLoading: true,
};

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

export const SearchScreen = (): JSX.Element => {
  const entityPreviewSearcher = provideAnswersHeadless({
    headlessId: "entity-preview-searcher",
    apiKey: "220cb8d6ae04d12ee7564f9421ec0a9e",
    experienceKey: "beverages",
    locale: "en",
    endpoints: answersSandboxEndpoints,
  });

  const [filters, setFilters] = useState<AutocompleteResult[]>([]);

  const answersActions = useAnswersActions();
  const query = useAnswersState((state) => state.query.input);

  /*
  Comments: 

  How do I turn off autocomplete for main provider
  why verticalResultsArray empty
  I thought vertical query would now be called on every keystroke

  I am displacing the normal autocomplete off the page
  */
  const renderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalResultsArray: VerticalResultsData[],
    onSubmit: (
      value: string,
      _index: number,
      itemData?: FocusedItemData
    ) => void
  ) => {
    return (
      <div className="bg-white">
        {filters.slice(0, 3).map((filter) => {
          const filterText = highlightText(
            filter.value,
            filter.matchedSubstrings
          );
          return (
            <div>
              <div
                className="py-1.5 px-3.5"
                dangerouslySetInnerHTML={{ __html: filterText }}
              ></div>
              <div className="h-px bg-primary-light mx-2" />
            </div>
          );
        })}
      </div>
    );
  };

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

  const highlightText = (
    text: string,
    matchedSubstrings?: { length: number; offset: number }[]
  ) => {
    if (!matchedSubstrings) {
      return text;
    }

    const highlightedSection = text.slice(
      matchedSubstrings[0].offset,
      matchedSubstrings[0].offset + matchedSubstrings[0].length
    );

    return text.replace(
      highlightedSection,
      `<span class="text-toast-dark-orange">${highlightedSection}</span>`
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full py-4 px-4">
        <img className="w-full" src="src/img/cocktails.png"></img>
      </div>
      <SearchBar
        customCssClasses={{
          container: "w-full px-4 border-black",
          inputDropdownContainer: "border-black",
          optionContainer: "fixed top-[-2000px]",
        }}
        placeholder="Search beer, wine, liqour "
        visualAutocompleteConfig={{
          // entityPreviewSearcher,
          renderEntityPreviews,
          entityPreviewsDebouncingTime: 200,
        }}
      />
    </div>
  );
};
