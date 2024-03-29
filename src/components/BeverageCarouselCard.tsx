import { CardProps } from "@yext/search-ui-react";
import { useNavigate } from "react-router-dom";
import Beverage from "../types/beverages";
import { GrayWineBottleIcon } from "../icons/GrayWineBottleIcon";
import { ImagePlaceholder } from "./ImagePlaceholder";

export const BeverageCarouselCard = ({ result }: CardProps<Beverage>) => {
  const beverage = result.rawData;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${beverage.name.toLowerCase().replaceAll(" ", "-")}/${beverage.id}`, {
      state: { beverage },
    });
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
