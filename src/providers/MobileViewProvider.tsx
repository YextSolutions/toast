import { Context, createContext, useReducer } from "react";
import ImageAssets from "../assets/imageAssets";
import { ActionMap } from "./CartProvider";

interface MobileView {
  searchBarActive: boolean;
  filterSectionActive: boolean;

  //TODO: Refactor to remove from context
  beverageResultImages: Record<string, string>;
}

export enum MobileViewActionTypes {
  TOGGLE_SEARCH_SCREEN = "TOGGLE_SEARCH_SCREEN",
  TOGGLE_FILTER_SECTION = "TOGGLE_FILTER_SECTION",
}

type MobileViewPayload = {
  [MobileViewActionTypes.TOGGLE_SEARCH_SCREEN]: boolean;
  [MobileViewActionTypes.TOGGLE_FILTER_SECTION]: boolean;
};

export type MobileViewActions = ActionMap<MobileViewPayload>[keyof ActionMap<MobileViewPayload>];

interface MobileViewContext {
  mobileView: MobileView;
  dispatch: React.Dispatch<MobileViewActions>;
}

const initialState = {
  searchBarActive: false,
  filterSectionActive: false,
  beverageResultImages: {
    beer: ImageAssets.beerToast,
    wine: ImageAssets.wineToast,
    liquor: ImageAssets.cocktailToast,
    search: ImageAssets.cocktails,
  },
};

export const MobileViewReducer = (state = initialState, action: MobileViewActions) => {
  switch (action.type) {
    case MobileViewActionTypes.TOGGLE_SEARCH_SCREEN:
      return { ...state, searchBarActive: action.payload };
    case MobileViewActionTypes.TOGGLE_FILTER_SECTION:
      return { ...state, filterSectionActive: action.payload };
    default:
      return state;
  }
};

const MobileViewContext: Context<MobileViewContext> = createContext({} as MobileViewContext);

const MobileViewProvider: React.FC = ({ children }) => {
  const [mobileView, dispatch] = useReducer(MobileViewReducer, initialState);

  return (
    <MobileViewContext.Provider value={{ mobileView, dispatch }}>
      {children}
    </MobileViewContext.Provider>
  );
};

export { MobileViewProvider, MobileViewContext };
