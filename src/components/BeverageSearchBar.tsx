import {
  FocusedItemData,
  isStringOrHighlightedValue,
  SearchBar,
  renderHighlightedValue,
  DropdownItem,
} from "@yext/answers-react-components";
import {
  provideAnswersHeadless,
  Result,
  useAnswersActions,
  useAnswersState,
  VerticalResults as VerticalResultsData,
} from "@yext/answers-headless-react";
import { useContext } from "react";
import { Divider } from "./Divider";
import {
  answersApiKey,
  answersExperienceKey,
  answersSandboxEndpoints,
} from "../config/answersConfig";
import { useNavigate } from "react-router-dom";
import { alcholicBeverageTypeDataForRender } from "../types/BeverageType";
import { Beverage, beverageDataForRender } from "../types/Beverage";
import { extractPathFromBeverageType } from "../utils/extractPathFromBeverageType";
import { extractPathFromBeverage } from "../utils/extractPathFromBeverage";
import { BeverageCard } from "./BeverageCard";
import { OverlayActionTypes, OverlayContext } from "../providers/OverlayProvider";

export const BeverageSearchBar = () => {
  const entityPreviewSearcher = provideAnswersHeadless({
    headlessId: "entity-preview-searcher",
    apiKey: answersApiKey,
    experienceKey: answersExperienceKey,
    locale: "en",
    endpoints: answersSandboxEndpoints,
  });
  const { dispatch } = useContext(OverlayContext);

  const navigate = useNavigate();

  const answersActions = useAnswersActions();

  const renderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalResultsArray: VerticalResultsData[],
    onSubmit: (value: string, _index: number, itemData?: FocusedItemData) => void
  ) => {
    const alcoholicBeverageTypeResults = verticalResultsArray.find(
      (verticalResult) => verticalResult.verticalKey === "autocomplete"
    )?.results;

    const beverageResults = verticalResultsArray.find(
      (verticalResult) => verticalResult.verticalKey === "beverages"
    )?.results;

    return (
      <div className="max-h-max overflow-y-scroll sm:max-h-96 sm:shadow-2xl">
        {renderFilterAutocomplete(alcoholicBeverageTypeResults)}
        {renderBeveragesAutocomplete(beverageResults)}
      </div>
    );
  };

  const query = useAnswersState((state) => state.query);

  const renderFilterAutocomplete = (results: Result[] | undefined) => {
    if (!results || results.length === 0) return <></>;

    return (
      <div>
        {results.slice(0, 3).map((result) => {
          const beverageTypeData = alcholicBeverageTypeDataForRender(result);
          const path = extractPathFromBeverageType(beverageTypeData);

          const title = isStringOrHighlightedValue(result.highlightedFields?.name)
            ? result.highlightedFields?.name
            : result.name;

          return title && result.name ? (
            <DropdownItem value={result.name} onClick={() => searchHandler(path)}>
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

  const renderBeveragesAutocomplete = (results: Result[] | undefined) => {
    if (!results || results.length === 0) return <></>;

    return results.map((result) => {
      const beverageData = beverageDataForRender(result);

      // TODO: Highlighted name in the Beverage card
      const title = isStringOrHighlightedValue(result.highlightedFields?.name)
        ? result.highlightedFields?.name
        : result.name;

      const path = extractPathFromBeverage(beverageData);

      return title && result.name ? (
        <DropdownItem value={result.name} onClick={() => searchHandler(path, beverageData)}>
          <BeverageCard result={result} autocomplete />
        </DropdownItem>
      ) : (
        <></>
      );
    });
  };

  const searchHandler = (path?: string, beverage?: Partial<Beverage>) => {
    answersActions.setSortBys([]);
    answersActions.resetFacets();
    dispatch({ type: OverlayActionTypes.ToggleSearchOverlay, payload: { open: false } });

    path &&
      navigate(path, {
        state: { beverage },
      });
  };

  const onSearch = (searchEventData: { verticalKey?: string; query?: string }) => {
    const { query } = searchEventData;
    searchHandler(`/search?query=${query}`);
  };

  return (
    <SearchBar
      customCssClasses={{
        container: `md:h-12 mt-6 px-4 sm:my-6`,
        inputContainer:
          "inline-flex items-center justify-between w-full rounded-3xl border border-black",
        logoContainer: "w-7 mx-2.5 my-2 ",
        dropdownContainer: "z-10",
        inputDropdownContainer: "relative bg-white  rounded-3xl w-full  ",
        inputDropdownContainer___active: "",
        optionContainer: "hidden",
      }}
      cssCompositionMethod="assign"
      onSearch={onSearch}
      placeholder="Search beer, wine, liqour "
      visualAutocompleteConfig={{
        entityPreviewSearcher,
        renderEntityPreviews,
        // includedVerticals: ["autocomplete", "beverages"],
      }}
    />
  );
};
