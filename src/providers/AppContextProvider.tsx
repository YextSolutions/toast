import { OverlayProvider } from "./OverlayProvider";
import { CartProvider } from "./CartProvider";

// From: https://medium.com/front-end-weekly/how-to-combine-context-providers-for-cleaner-react-code-9ed24f20225e
// export const AppContextProvider = combineComponents(...providers);

export interface ProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: ProviderProps): JSX.Element => {
  return (
    <OverlayProvider>
      <CartProvider>{children}</CartProvider>
    </OverlayProvider>
  );
};
