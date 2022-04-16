import "./App.css";
import { PageRouter } from "./PageRouter";
import { routeConfig } from "./config/routeConfig";
import { createContext, useMemo, useState } from "react";

interface SearchContext {
  active: boolean;
  setActive: (active: boolean) => void;
}

const searchCtx: SearchContext = {
  active: false,
  setActive: (active: boolean) => {},
};

export const SearchCtx = createContext<SearchContext>(searchCtx);

function App() {
  const [active, setActive] = useState(false);
  const value = useMemo(() => ({ active, setActive }), [active]);

  return (
    <SearchCtx.Provider value={value}>
      <div className="font-primary">
        <PageRouter routes={routeConfig} />
      </div>
    </SearchCtx.Provider>
  );
}

export default App;
