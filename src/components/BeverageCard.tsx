import { Result } from "@yext/answers-headless-react";
import { CardProps, isString, validateData } from "@yext/answers-react-components";
import classNames from "classnames";
import { StarRating } from "./StarRating";

type Thumbnail = {
  height: number;
  width: number;
  url: string;
};

type Image = {
  height?: number;
  width?: number;
  url: string;
  thumbnails?: Thumbnail[];
};

export interface Beverage {
  id: string;
  name: string;
  c_alcoholType: string;
  c_category: string;
  c_subCategory: string;
  photoGallery?: {
    image: {
      url: string;
      width: string;
      height: string;
      sourceUrl: string;
      thumbnails: {
        url: string;
        width: string;
        height: string;
      }[];
    };
  }[];
  c_priceRange: string;
}

// TODO: either pass as prop to other components or add to util folder
export const dataForRender = (result: Result | undefined): Partial<Beverage> => {
  if (!result) return {};

  const data = {
    name: result.rawData.name,
    photoGallery: result.rawData.photoGallery,
    c_priceRange: result.rawData.c_priceRange,
    c_alcoholType: result.rawData.c_alcoholType,
    c_category: result.rawData.c_category,
    c_subCategory: result.rawData.c_subCategory,
  };

  return validateData(data, {
    name: isString,
    photoGallery: isPhotoGallery,
    c_priceRange: isString,
    c_alcoholType: isString,
    c_category: isString,
    c_subCategory: isString,
  });
};

const isPhotoGallery = (data: any) => {
  return true;
};

const isImage = (data: any): data is Image => {
  debugger;
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const expectedKeys = ["url"];
  return expectedKeys.every((key) => {
    return key in data;
  });
};

export function isArray(data: unknown): data is [] {
  if (!Array.isArray(data) || data === null) {
    return false;
  }

  return true;
}

interface BeverageCardProps extends CardProps {
  autocomplete?: boolean;
}

export const BeverageCard = ({ result, autocomplete }: BeverageCardProps): JSX.Element => {
  const beverage = dataForRender(result);

  return (
    <div
      className={classNames(
        { "h-72 m-2": !autocomplete },
        {
          "max-h-28": false,
        },
        { "flex py-1 items-center h-20 w-20": autocomplete }
      )}
    >
      <div
        className={classNames("w-full h-40 flex justify-center items-center", {
          "w-16": autocomplete,
        })}
      >
        <img className="w-24" src={beverage.photoGallery?.[0].image.url} />
      </div>
      <div className="overflow-hidden text-ellipsis h-10">
        <p className="text-sm">{beverage.name}</p>
      </div>
      <div className="mb-1 text-xs">
        <p>{beverage.c_priceRange?.split(" ")[0]}</p>
      </div>
      <StarRating />
      {/* <div className="ml-6 text-sm w-80">
        <div
          dangerouslySetInnerHTML={{
            __html:
              typeof beverageTitle === "string"
                ? beverageTitle
                : highlightText(beverageTitle),
          }}
        />
        <div className="font-bold">
          {beverageData.c_priceRange?.split(" ")[0]}
        </div>
      </div>  */}
    </div>
  );
};
