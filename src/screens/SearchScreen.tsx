import {
  AutocompleteResult,
  provideAnswersHeadless,
  Result,
  useAnswersActions,
  useAnswersState,
  VerticalResults as VerticalResultsData,
} from "@yext/answers-headless-react";
import {
  FocusedItemData,
  isString,
  SearchBar,
  validateData,
} from "@yext/answers-react-components";
import { answersSandboxEndpoints } from "../main";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

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

type Thumbnail = {
  height: number;
  width: number;
  url: string;
};

type Image = {
  height?: number;
  width?: number;
  url: string;
  thumbnails?: Thumbnail[];
};

type PhotoGallery = {
  photoGallery: Image[];
};
interface Beverage {
  id: string;
  name: string;
  photoGallery: Image[];
}

export const SearchScreen = (): JSX.Element => {
  const entityPreviewSearcher = provideAnswersHeadless({
    headlessId: "entity-preview-searcher",
    apiKey: "220cb8d6ae04d12ee7564f9421ec0a9e",
    experienceKey: "beverages",
    locale: "en",
    endpoints: answersSandboxEndpoints,
  });

  const filtersRef = useRef<HTMLDivElement>(null);
  const beveragesRef = useRef<HTMLDivElement>(null);

  const { height } = useWindowDimensions();

  const [filters, setFilters] = useState<AutocompleteResult[]>([]);

  const answersActions = useAnswersActions();
  const query = useAnswersState((state) => state.query.input);

  /*
   * 1. timing
   * 2. height / divider color
   * 3. beverage name (highlighted)
   * 4. beverage photo
   * 5. price
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

  const renderFilterAutocomplete = (results: AutocompleteResult[]) => (
    <div ref={filtersRef}>
      {results.slice(0, 3).map((filter, i) => {
        const filterText = highlightText(
          filter.value,
          filter.matchedSubstrings
        );
        return (
          <div>
            <div
              className="py-1.5 px-3.5"
              dangerouslySetInnerHTML={{ __html: filterText }}
            />
            <div className="h-px bg-primary-light mx-2" />
          </div>
        );
      })}
    </div>
  );

  const renderBeveragesAutocomplete = (verticalResults: Result[]) =>
    verticalResults
      .slice(0, Math.round(height / 112) - 3 || 0)
      .map((verticalResult) => {
        const beverageData = dataForRender(verticalResult);
        const highlightedText = highlightText(
          beverageData.name ?? ""
          // verticalResult.highlightedFields?.name?.matchedSubstrings as  { length: number; offset: number }[]
        );
        return (
          <div ref={beveragesRef}>
            <div className="h-28 flex py-1">
              <img src={"src/img/temp.png"} />
              <div
                // className=""
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              />
            </div>
            <div className="h-px bg-primary-light mx-2" />
          </div>
        );
      });

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
    <div className="flex flex-col items-center h-screen">
      {/* <div className="w-full py-4 px-4">
        <img className="w-full" src="src/img/cocktails.png"></img>
      </div> */}
      <SearchBar
        customCssClasses={{
          container: "w-full px-4 border-black mt-2",
          inputDropdownContainer: "border-black",
          optionContainer: "fixed top-[-2000px]",
        }}
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

function dataForRender(result: Result): Partial<Beverage> {
  const data = {
    id: result.id,
    name: result.name,
  };

  return validateData(data, {
    id: isString,
    name: isString,
  });
}
