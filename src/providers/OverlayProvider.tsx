import { createContext, Dispatch, useReducer } from "react";

interface OverlayState {
  searchOverlay: { open: boolean };
  filterOverlay: { open: boolean };
}

export enum OverlayActionTypes {
  ToggleSearchOverlay,
  ToggleFilterOverlay,
}

export interface ToggleSearchOverlay {
  type: OverlayActionTypes.ToggleSearchOverlay;
  payload: { open: boolean };
}

export interface ToggleFilterOverlay {
  type: OverlayActionTypes.ToggleFilterOverlay;
  payload: { open: boolean };
}

export type OverlayActions = ToggleSearchOverlay | ToggleFilterOverlay;

const initialState: OverlayState = {
  searchOverlay: { open: false },
  filterOverlay: { open: false },
};

export const OverlayReducer = (state = initialState, action: OverlayActions) => {
  switch (action.type) {
    case OverlayActionTypes.ToggleSearchOverlay:
      return { ...state, searchOverlay: { open: action.payload.open } };
    case OverlayActionTypes.ToggleFilterOverlay:
      return { ...state, filterOverlay: { open: action.payload.open } };
    default:
      return state;
  }
};

const OverlayContext = createContext<{
  overlayState: OverlayState;
  dispatch: Dispatch<OverlayActions>;
}>({ overlayState: initialState, dispatch: () => {} });

const OverlayProvider: React.FC = ({ children }) => {
  const [overlayState, dispatch] = useReducer(OverlayReducer, initialState);

  return (
    <OverlayContext.Provider value={{ overlayState, dispatch }}>{children}</OverlayContext.Provider>
  );
};

export { OverlayProvider, OverlayContext };
