import { OverlayProvider } from "./OverlayProvider";
import { CartProvider } from "./CartProvider";
import { combineComponents } from "../utils/combineComponents";

const providers = [OverlayProvider, CartProvider];

// From: https://medium.com/front-end-weekly/how-to-combine-context-providers-for-cleaner-react-code-9ed24f20225e
export const AppContextProvider = combineComponents(...providers);
