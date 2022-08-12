import { FC } from "react";

interface ComponentProps {
  children: React.ReactNode;
}

// From: https://medium.com/front-end-weekly/how-to-combine-context-providers-for-cleaner-react-code-9ed24f20225e
export const combineComponents = (...components: FC[]): FC => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: ComponentProps<FC>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};
