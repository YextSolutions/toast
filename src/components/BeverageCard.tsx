import { Result } from "@yext/answers-headless-react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { beverageDataForRender } from "../types/Beverage";
import { extractPathFromBeverage } from "../utils/extractPathFromBeverage";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { StarRating } from "./StarRating";
import { GrayWineBottleIcon } from "../icons/GrayWineBottleIcon";

interface BeverageCardProps {
  result?: Result;
  autocomplete?: boolean;
  name?: string;
  imageUrl?: string;
  price?: string;
}

export const BeverageCard = ({
  result,
  autocomplete,
  name,
  imageUrl,
  price,
}: BeverageCardProps): JSX.Element => {
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
    <div
      className={classNames("flex ", {
        "flex-col border-4 border-transparent px-4 py-4 hover:border-toast-orange": !autocomplete,
        "py-2 hover:bg-toast-gray": autocomplete,
      })}
      onClick={() => handleClick()}
    >
      <div className={classNames(" flex flex-col justify-center ")}>
        <div className={classNames("flex", { "justify-center": !autocomplete })}>
          <ImagePlaceholder
            imgCssClasses={autocomplete ? "w-16 px-2" : "w-24 mb-2"}
            imgUrl={imageUrl ?? beverage.primaryPhoto?.image.url}
            placeholder={<GrayWineBottleIcon />}
          />
        </div>
      </div>
      <div className={classNames("flex flex-col", { "justify-center": autocomplete })}>
        <div
          className={classNames("overflow-hidden text-ellipsis text-base ", {
            "h-16": !autocomplete,
          })}
        >
          <p className="line-clamp-2">{name ?? beverage.name}</p>
        </div>
        <div>
          <div className={autocomplete ? "" : "pb-8"}>
            {(price || beverage.c_price) && (
              <div className="text-base">{`$${price ?? beverage.c_price}`}</div>
            )}
            {beverage.c_rating && <StarRating rating={beverage.c_rating} />}
          </div>
        </div>
      </div>
    </div>
  );
};
