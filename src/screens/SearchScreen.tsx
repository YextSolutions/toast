import {
  AutocompleteResult,
  HighlightedValue,
  provideAnswersHeadless,
  Result,
  useAnswersActions,
  useAnswersState,
  VerticalResults as VerticalResultsData,
} from "@yext/answers-headless-react";
import {
  FocusedItemData,
  isString,
  isStringOrHighlightedValue,
  SearchBar,
  validateData,
} from "@yext/answers-react-components";
import { useEffect, useLayoutEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Divider } from "../components/Divider";
import classNames from "classnames";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { answersSandboxEndpoints } from "../config";
import { CategoryGrid } from "../components/CategoryGrid";
import {
  beerBottles,
  orangeCocktail,
  shaker,
  wineGlasses,
} from "../assets/imageAssets";

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

interface Beverage {
  id: string;
  name: string;
  photoGallery: Image[];
  c_priceRange: string;
}

export const SearchScreen = (): JSX.Element => {
  const entityPreviewSearcher = provideAnswersHeadless({
    headlessId: "entity-preview-searcher",
    apiKey: "220cb8d6ae04d12ee7564f9421ec0a9e",
    experienceKey: "beverages",
    locale: "en",
    endpoints: answersSandboxEndpoints,
    // verticalKey: "beverages",
  });

  const [filters, setFilters] = useState<AutocompleteResult[]>([]);
  const [activeSearch, setActiveSearch] = useState(false);

  const answersActions = useAnswersActions();
  const query = useAnswersState((state) => state.query.input);

  const { height, width } = useWindowDimensions();

  /*
   * 1. move search container on focus
   * 2. animate movement
   * 3  cancel search bar on close button click / click outside
   *
   * I can't move the search bar because I can't determine when it's being focused on. Maybe I can still use document.activeElement with an id on the SearchBar?
   * I can't control the functionality of the X button
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

  const renderBeveragesAutocomplete = (verticalResults: Result[]) =>
    verticalResults
      // .slice(0, Math.round(height / 112) - 3 || 0)
      .map((verticalResult, i) => {
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
                <div className="flex text-toast-orange">
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStar size={16} />
                  <FaStarHalf size={16} />
                </div>
              </div>
            </div>
            <Divider />
          </div>
        );
      });

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
    <div>
      {/* <div className="w-full flex justify-center">
        <div className={classNames("w-full py-4 px-4 max-w-sm")}>
          <img className="w-full" src="src/img/cocktails.png"></img>
        </div>
      </div> */}
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
      {!activeSearch && (
        <CategoryGrid
          title="BROWSE CATEGORIES"
          options={[
            { name: "BEER", img: beerBottles },
            { name: "WINE", img: wineGlasses },
            { name: "LIQOUR", img: orangeCocktail },
            { name: "OTHER", img: shaker },
          ]}
        />
      )}
    </div>
  );
};

const dataForRender = (result: Result): Partial<Beverage> => {
  const data = {
    id: result.id,
    name: result.name,
    photoGallery: result.rawData.photoGallery,
    c_priceRange: result.rawData.c_priceRange,
  };

  return validateData(data, {
    id: isString,
    name: isString,
    photoGallery: isPhotoGallery,
    c_priceRange: isString,
  });
};

const isPhotoGallery = (data: any): data is [] => {
  // if (!Array.isArray(data) || data === null) {
  //   return false;
  // }

  return true;
};

const isImage = (data: any): data is Image => {
  debugger;
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const expectedKeys = ["url"];
  return expectedKeys.every((key) => {
    return key in data;
  });
};

export function isArray(data: unknown): data is [] {
  if (!Array.isArray(data) || data === null) {
    return false;
  }

  return true;
}
