import {
  FocusedItemData,
  SearchBar,
  renderHighlightedValue,
  DropdownItem,
} from "@yext/search-ui-react";
import {
  Result,
  useSearchActions,
  SandboxEndpoints,
  provideHeadless,
  VerticalResults as VerticalResultsData,
  HighlightedValue,
} from "@yext/search-headless-react";
import { useContext } from "react";
import { Divider } from "./Divider";
import { useNavigate } from "react-router-dom";
import Beverage from "../types/beverages";
import { BeverageCard } from "./BeverageCard";
import { OverlayActionTypes, OverlayContext } from "../providers/OverlayProvider";
import searchConfig from "../config/searchConfig";
import BeverageCategory from "../types/beverage_categories";
import getCategoryOrderFromBeverage from "../utils/getCategoryOrderFromBeverage";
import getCategoryOrderFromBeverageCategory from "../utils/getCategoryOrderFromBeverageCategory";

export const BeverageSearchBar = () => {
  const entityPreviewSearcher = provideHeadless({
    headlessId: "entity-preview-searcher",
    apiKey: searchConfig.apiKey,
    experienceKey: searchConfig.experienceKey,
    locale: searchConfig.locale,
    endpoints: SandboxEndpoints,
  });
  const { dispatch } = useContext(OverlayContext);

  const navigate = useNavigate();

  const searchActions = useSearchActions();

  const renderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResultsData>,
    dropdownItemProps: {
      onClick: (value: string, _index: number, itemData?: FocusedItemData) => void;
      ariaLabel: (value: string) => string;
    }
  ): JSX.Element | null => {
    const beverageCategories = verticalKeyToResults["beverage_categories"]?.results.map(
      (result) => result
    ) as unknown as Result<BeverageCategory>[];

    const beverageResults = verticalKeyToResults["beverages"]?.results.map(
      (result) => result
    ) as unknown as Result<Beverage>[];

    return (
      <div className="max-h-max overflow-y-scroll sm:max-h-96 sm:shadow-2xl">
        {renderBeverageFilterDropdown(beverageCategories)}
        {renderBeveragesDropdown(beverageResults)}
      </div>
    );
  };

  const renderBeverageFilterDropdown = (results: Result<BeverageCategory>[]): JSX.Element => {
    if (!results || results.length === 0) return <></>;

    return (
      <div>
        {results.slice(0, 3).map((result) => {
          const title: string | Partial<HighlightedValue> =
            (result.highlightedFields?.name as unknown as string) ??
            (result.name as Partial<HighlightedValue>);
          const categoryUrl = getCategoryOrderFromBeverageCategory(result.rawData)
            .map((category) => category.toLowerCase().replaceAll(" ", "-"))
            .join("/");

          return title && result.name ? (
            <DropdownItem value={result.name} onClick={() => searchHandler(categoryUrl)}>
              <div className="py-1.5 px-3.5 hover:bg-toast-gray">
                {renderHighlightedValue(title, {
                  nonHighlighted: "text-primary text-black text-base ",
                  highlighted: "text-toast-dark-orange text-base",
                })}
                <Divider />
              </div>
            </DropdownItem>
          ) : (
            <></>
          );
        })}
      </div>
    );
  };

  const renderBeveragesDropdown = (results: Result<Beverage>[]) => {
    if (!results || results.length === 0) return <></>;

    return results.map((result) => {
      const title = result.highlightedFields?.name ?? result.name;
      const productUrl = getCategoryOrderFromBeverage(result.rawData)
        .map((category) => category.toLowerCase().replaceAll(" ", "-"))
        .join("/")
        .concat(`/${result.name?.toLowerCase().replaceAll(" ", "-")}/${result.id}`);

      return title && result.name ? (
        <DropdownItem value={result.name} onClick={() => searchHandler(productUrl, result.rawData)}>
          <BeverageCard result={result} autocomplete />
        </DropdownItem>
      ) : (
        <></>
      );
    });
  };

  const searchHandler = (path?: string, beverage?: Beverage) => {
    // TODO: move logic to hook
    searchActions.setSortBys([]);
    searchActions.resetFacets();
    dispatch({ type: OverlayActionTypes.ToggleSearchOverlay, payload: { open: false } });

    path &&
      navigate("../" + path, {
        replace: true,
        state: { beverage },
      });
  };

  // change to handle search
  const onSearch = (searchEventData: { verticalKey?: string; query?: string }) => {
    const { query } = searchEventData;
    searchHandler(`/search?query=${query}`);
  };

  return (
    <SearchBar
      customCssClasses={{
        searchBarContainer: `md:h-12 mt-6 sm:my-6 px-4`,
        // inputElement:
        //   "inline-flex items-center justify-between w-full rounded-3xl border border-black",
      }}
      hideRecentSearches
      onSearch={onSearch}
      placeholder="Search beer, wine, liqour "
      visualAutocompleteConfig={{
        entityPreviewSearcher,
        renderEntityPreviews,
        entityPreviewsDebouncingTime: 200,
        includedVerticals: ["beverage_categories", "beverages"],
      }}
    />
  );
};
