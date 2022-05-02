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
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Divider } from "./Divider";
import {
  answersApiKey,
  answersExperienceKey,
  answersSandboxEndpoints,
} from "../config/answersConfig";
import { useNavigate } from "react-router-dom";
import { SearchCtx } from "../App";
import { alcholicBeverageTypeDataForRender } from "../types/BeverageType";
import { Beverage, beverageDataForRender } from "../types/Beverage";
import { extractPathFromBeverageType } from "../utils/extractPathFromBeverageType";
import { extractPathFromBeverage } from "../utils/extractPathFromBeverage";
import { BeverageCard } from "./BeverageCard";

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

  // TODO: why do I need this?
  const query = useAnswersState((state) => state.query.input);
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
      <>
        {renderFilterAutocomplete(alcoholicBeverageTypeResults)}
        {renderBeveragesAutocomplete(beverageResults)}
      </>
    );
  };

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
              <div className="py-1.5 px-3.5">
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
    answersActions.resetFacets();
    setSearchBarActive(false);

    path &&
      navigate(path, {
        state: { beverage },
      });
  };

  const handleSubmit = (searchEventData: { verticalKey?: string; query?: string }) => {
    const { query } = searchEventData;
    answersActions.setSortBys([]);
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
          // includedVerticals: ["autocomplete", "beverages"],
        }}
      />
    </div>
  );
};
