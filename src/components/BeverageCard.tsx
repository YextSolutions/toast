import { CardProps } from "@yext/answers-react-components";
import classNames from "classnames";
import { beverageDataForRender } from "../types/Beverage";
import { StarRating } from "./StarRating";

interface BeverageCardProps extends CardProps {
  autocomplete?: boolean;
}

export const BeverageCard = ({ result, autocomplete }: BeverageCardProps): JSX.Element => {
  const beverage = beverageDataForRender(result);

  return (
    <div
      className={classNames(
        "flex flex-col justify-between",
        { "h-72 mx-2 my-4": !autocomplete },
        {
          "max-h-28": false,
        },
        { "flex py-1 items-center h-20 w-20": autocomplete }
      )}
    >
      <div
        className={classNames("w-full flex flex-col justify-center ", {
          "w-16": autocomplete,
        })}
      >
        <div className="w-full flex justify-center">
          <img className="w-24" src={beverage.primaryPhoto?.image.url} />
        </div>
        <div className="overflow-hidden text-ellipsis text-base max-h-20">{beverage.name}</div>
      </div>
      <div className="">
        <div className="pb-8">
          {beverage.c_price && <div className="text-base">{`$${beverage.c_price}`}</div>}
          <StarRating />
        </div>
      </div>
    </div>
  );
};
