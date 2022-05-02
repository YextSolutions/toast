import { Result } from "@yext/answers-headless-react";
import { CardProps } from "@yext/answers-react-components";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { beverageDataForRender } from "../types/Beverage";
import { extractPathFromBeverage } from "../utils/extractPathFromBeverage";
import { StarRating } from "./StarRating";

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
      className={classNames("flex ", { "mx-2 my-4 flex-col ": !autocomplete })}
      onClick={() => handleClick()}
    >
      <div className={classNames(" flex flex-col justify-center ")}>
        <div className={classNames("flex", { "justify-center": !autocomplete })}>
          <img
            className={autocomplete ? "w-16" : "w-24 mb-2"}
            src={imageUrl ?? beverage.primaryPhoto?.image.url}
          />
        </div>
      </div>
      <div className={classNames("flex flex-col", { "justify-center": autocomplete })}>
        <div
          className={classNames("overflow-hidden text-ellipsis text-base ", {
            "h-20": !autocomplete,
          })}
        >
          {name ?? beverage.name}
        </div>
        <div>
          <div className={autocomplete ? "" : "pb-8"}>
            {(price || beverage.c_price) && (
              <div className="text-base">{`$${price ?? beverage.c_price}`}</div>
            )}
            <StarRating />
          </div>
        </div>
      </div>
    </div>
  );
};
