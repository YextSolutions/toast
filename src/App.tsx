import "./App.css";
import { PageRouter } from "./PageRouter";
import { routeConfig } from "./config/routeConfig";
import { createContext, useMemo, useState } from "react";
import ImageAssets from "./assets/imageAssets";

interface SearchContext {
  active: boolean;
  setActive: (active: boolean) => void;
  beverageResultImages: Record<string, string>;
}

const searchCtx: SearchContext = {
  active: false,
  setActive: (active: boolean) => {},
  beverageResultImages: {
    beer: ImageAssets.beerToast,
    wine: ImageAssets.wineToast,
    liquor: ImageAssets.cocktailToast,
    search: ImageAssets.cocktails,
  },
};

export const SearchCtx = createContext<SearchContext>(searchCtx);

function App() {
  const [active, setActive] = useState(false);
  const value = useMemo(() => ({ active, setActive }), [active]);

  return (
    <SearchCtx.Provider value={{ ...value, beverageResultImages: searchCtx.beverageResultImages }}>
      <div className="font-primary">
        <PageRouter routes={routeConfig} />
      </div>
    </SearchCtx.Provider>
  );
}

export default App;
