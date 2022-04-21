import "./App.css";
import { PageRouter } from "./PageRouter";
import { routeConfig } from "./config/routeConfig";
import { createContext, useMemo, useState } from "react";
import ImageAssets from "./assets/imageAssets";
interface SearchContext {
  searchBarActive: boolean;
  setSearchBarActive: (active: boolean) => void;
  filterSectionActive: boolean;
  setFilterSectionActive: (active: boolean) => void;
  beverageResultImages: Record<string, string>;
}

const searchCtx: SearchContext = {
  searchBarActive: false,
  setSearchBarActive: (active: boolean) => {},
  filterSectionActive: false,
  setFilterSectionActive: (active: boolean) => {},
  beverageResultImages: {
    beer: ImageAssets.beerToast,
    wine: ImageAssets.wineToast,
    liquor: ImageAssets.cocktailToast,
    search: ImageAssets.cocktails,
  },
};

export const SearchCtx = createContext<SearchContext>(searchCtx);

function App() {
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [filterSectionActive, setFilterSectionActive] = useState(false);
  const searchBar = useMemo(() => ({ searchBarActive, setSearchBarActive }), [searchBarActive]);
  const filterSection = useMemo(
    () => ({ filterSectionActive, setFilterSectionActive }),
    [filterSectionActive]
  );

  return (
    <SearchCtx.Provider
      value={{
        ...searchBar,
        ...filterSection,
        beverageResultImages: searchCtx.beverageResultImages,
      }}
    >
      <div className="font-primary">
        <PageRouter routes={routeConfig} />
      </div>
    </SearchCtx.Provider>
  );
}

export default App;
