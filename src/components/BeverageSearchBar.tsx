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
} from "@yext/search-headless-react";
import { useContext } from "react";
import { Divider } from "./Divider";
import { useNavigate } from "react-router-dom";
import Beverage from "../types/beverages";
import { extractPathFromBeverageType } from "../utils/extractPathFromBeverageType";
import { extractPathFromBeverage } from "../utils/extractPathFromBeverage";
import { BeverageCard } from "./BeverageCard";
import { OverlayActionTypes, OverlayContext } from "../providers/OverlayProvider";
import searchConfig from "../config/searchConfig";

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

  // const renderEntityPreviews = (
  //   autocompleteLoading: boolean,
  //   verticalResultsArray: VerticalResultsData[],
  //   onSubmit: (value: string, _index: number, itemData?: FocusedItemData) => void
  // ) => {
  //   const alcoholicBeverageTypeResults = verticalResultsArray.find(
  //     (verticalResult) => verticalResult.verticalKey === "autocomplete"
  //   )?.results;

  //   const beverageResults = verticalResultsArray.find(
  //     (verticalResult) => verticalResult.verticalKey === "beverages"
  //   )?.results;

  //   return (
  //     <div className="max-h-max overflow-y-scroll sm:max-h-96 sm:shadow-2xl">
  //       {renderFilterAutocomplete(alcoholicBeverageTypeResults)}
  //       {renderBeveragesAutocomplete(beverageResults)}
  //     </div>
  //   );
  // };

  // const renderFilterAutocomplete = (results: Result[] | undefined) => {
  //   if (!results || results.length === 0) return <></>;

  //   return (
  //     <div>
  //       {results.slice(0, 3).map((result) => {
  //         const beverageTypeData = alcholicBeverageTypeDataForRender(result);
  //         const path = extractPathFromBeverageType(beverageTypeData);

  //         const title = isStringOrHighlightedValue(result.highlightedFields?.name)
  //           ? result.highlightedFields?.name
  //           : result.name;

  //         return title && result.name ? (
  //           <DropdownItem value={result.name} onClick={() => searchHandler(path)}>
  //             <div className="py-1.5 px-3.5 hover:bg-toast-gray">
  //               {renderHighlightedValue(title, {
  //                 nonHighlighted: "text-primary text-black text-base ",
  //                 highlighted: "text-toast-dark-orange text-base",
  //               })}
  //               <Divider />
  //             </div>
  //           </DropdownItem>
  //         ) : (
  //           <></>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  // const renderBeveragesAutocomplete = (results: Result[] | undefined) => {
  //   if (!results || results.length === 0) return <></>;

  //   return results.map((result) => {
  //     const beverageData = beverageDataForRender(result);

  //     // TODO: Highlighted name in the Beverage card
  //     const title = isStringOrHighlightedValue(result.highlightedFields?.name)
  //       ? result.highlightedFields?.name
  //       : result.name;

  //     const path = extractPathFromBeverage(beverageData);

  //     return title && result.name ? (
  //       <DropdownItem value={result.name} onClick={() => searchHandler(path, beverageData)}>
  //         <BeverageCard result={result} autocomplete />
  //       </DropdownItem>
  //     ) : (
  //       <></>
  //     );
  //   });
  // };

  const searchHandler = (path?: string, beverage?: Partial<Beverage>) => {
    searchActions.setSortBys([]);
    searchActions.resetFacets();
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
        searchBarContainer: `md:h-12 mt-6 sm:my-6 px-4`,
        inputElement:
          "inline-flex items-center justify-between w-full rounded-3xl border border-black",
        // logoContainer: "w-7 mx-2.5 my-2 ",
        // dropdownContainer: "z-10",
        // inputDropdownContainer: "relative bg-white  rounded-3xl w-full  ",
        // optionContainer: "hidden",
      }}
      onSearch={onSearch}
      placeholder="Search beer, wine, liqour "
      // visualAutocompleteConfig={{
      //   entityPreviewSearcher,
      //   renderEntityPreviews,
      //   // includedVerticals: ["autocomplete", "beverages"],
      // }}
    />
  );
};
