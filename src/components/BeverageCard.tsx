import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { extractPathFromBeverage } from "../utils/extractPathFromBeverage";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { StarRating } from "./StarRating";
import { GrayWineBottleIcon } from "../icons/GrayWineBottleIcon";
import { CardProps } from "@yext/search-ui-react";
import Beverage from "../types/beverages";

interface BeverageCardProps<T> extends CardProps<T> {
  autocomplete?: boolean;
  name?: string;
  imageUrl?: string;
  price?: number;
}

export const BeverageCard = ({
  result,
  autocomplete,
  name,
  imageUrl,
  price,
}: BeverageCardProps<Beverage>): JSX.Element => {
  const beverage = result.rawData;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${beverage.name.toLowerCase().replaceAll(" ", "-")}/${beverage.id}`, {
      state: { beverage },
    });
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
