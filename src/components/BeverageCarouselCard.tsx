import { CardProps } from "@yext/answers-react-components";
import { useNavigate } from "react-router-dom";
import ImageAssets from "../assets/imageAssets";
import { beverageDataForRender } from "../types/Beverage";
import { extractPathFromBeverage } from "../utils/extractPathFromBeverage";
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
      <div className="border border-toast-dark-orange  mx-1">
        <div className="w-52 h-40 flex justify-center items-center">
          <ImagePlaceholder
            imgCssClasses="w-24"
            imgUrl={beverage.primaryPhoto?.image.sourceUrl}
            placeholderImg={ImageAssets.wineOutline}
            alt={result.name}
          />
        </div>
      </div>
      <div className="mt-2 mb-6 pr-4 pl-1 w-52">
        <p className="truncate font-semibold text-xs sm:text-sm">{beverage.name}</p>
        {beverage.c_price && <div className="text-xxs sm:text-xs">{`$${beverage.c_price}`}</div>}
      </div>
    </div>
  );
};
