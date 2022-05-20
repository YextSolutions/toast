import { CardProps } from "@yext/answers-react-components";
import { useNavigate } from "react-router-dom";
import { beverageDataForRender } from "../types/Beverage";
import { extractPathFromBeverage } from "../utils/extractPathFromBeverage";
import { GrayWineBottleIcon } from "./GrayWineBottleIcon";
import { ImagePlaceholder } from "./ImagePlaceholder";

export const BeverageCarouselCard = ({ result }: CardProps) => {
  const beverage = beverageDataForRender(result);

  const navigate = useNavigate();

  const handleClick = () => {
    const path = extractPathFromBeverage(beverage);

    if (path) {
      navigate(`${extractPathFromBeverage(beverage)}`, {
        state: { beverage },
      });
    }
  };

  return (
    <div className="flex flex-col" onClick={() => handleClick()}>
      <div className="mx-1  bg-toast-light-orange">
        <div className="flex h-40 w-52 items-center justify-center">
          <ImagePlaceholder
            imgCssClasses="w-24"
            imgUrl={beverage.primaryPhoto?.image.url}
            placeholder={<GrayWineBottleIcon />}
            alt={result.name}
          />
        </div>
      </div>
      <div className="mt-2 mb-6 w-52 pr-4 pl-1">
        <p className="truncate text-xs font-semibold sm:text-sm">{beverage.name}</p>
        {beverage.c_price && <div className="text-xxs sm:text-xs">{`$${beverage.c_price}`}</div>}
      </div>
    </div>
  );
};
