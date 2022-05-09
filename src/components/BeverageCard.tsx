import { Result } from "@yext/answers-headless-react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { beverageDataForRender } from "../types/Beverage";
import { extractPathFromBeverage } from "../utils/extractPathFromBeverage";
import { ImagePlaceholder } from "./ImagePlaceholder";
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
            placeholder={GrayWineBottle()}
          />
        </div>
      </div>
      <div className={classNames("flex flex-col", { "justify-center": autocomplete })}>
        <div
          className={classNames("overflow-hidden text-ellipsis text-base ", {
            "h-16": !autocomplete,
          })}
        >
          <p className="line-clamp-2 xl:line-clamp-3">{name ?? beverage.name}</p>
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

export const GrayWineBottle = (): JSX.Element => (
  <svg width="96" height="144" viewBox="0 0 67 250" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_434_142)">
      <path d="M63.7144 103.981H43.9248V242.509H63.7144V103.981Z" fill="white" />
      <path d="M43.9235 10.6875H32.6152V68.6438H43.9235V10.6875Z" fill="white" />
      <path
        d="M22.7129 0.434238C22.1977 0.825899 21.9155 1.78201 21.8007 3.51869C21.7431 4.39013 21.5647 5.26053 21.4064 5.45127C21.231 5.66261 21.0706 7.18853 20.9968 9.36293C20.8943 12.3786 20.9433 13.0675 21.2982 13.8156C21.4848 14.2088 21.5864 14.7007 21.5997 17.07L19.9102 63.7586C20.0313 65.5645 19.6035 67.057 18.7054 68.6066C17.9803 69.7811 16.8013 71.2054 14.5011 73.856C5.30684 83.5534 0.830187 95.9884 -0.000976562 109.114L0.0376599 240.165C0.476766 243.564 2.20715 248.864 4.93089 250.006H61.826C64.5498 248.864 66.2801 243.564 66.7192 240.165L66.7579 109.114C65.9267 95.988 61.4498 83.5529 52.2558 73.856C49.5709 70.7624 48.4137 69.339 47.7225 68.0339C46.9488 66.8097 46.9095 65.4998 46.8592 64.1094L45.1598 17.072C45.1731 14.7026 45.2747 14.2106 45.4612 13.8176C45.8162 13.0696 45.8651 12.3807 45.7627 9.36491C45.6889 7.19063 45.5284 5.66475 45.353 5.45325C45.1947 5.26251 45.0164 4.39211 44.9588 3.52067C44.844 1.78406 44.5618 0.828051 44.0466 0.436217C36.9594 -0.109877 29.7973 -0.160835 22.7109 0.436217L22.7129 0.434238ZM40.5312 15.5515H41.768V60.0781H40.5312V15.5515ZM54.3839 111.531V240.411H52.8997V111.531H54.3839V111.531ZM59.5787 111.531V240.411H56.3629V111.531H59.5787V111.531Z"
        fill="#C4C4C4"
      />
    </g>
    <defs>
      <clipPath id="clip0_434_142">
        <rect width="66.758" height="250" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
