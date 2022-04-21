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

// TODO: clean up interface and validation functions
export interface Beverage {
  id: string;
  name: string;
  c_alcoholType: string;
  c_category: string;
  c_subCategory: string;
  c_price: string;
  primaryPhoto: {
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
  };
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
    primaryPhoto: result.rawData.primaryPhoto,
    c_price: result.rawData.c_price,
    photoGallery: result.rawData.photoGallery,
    c_priceRange: result.rawData.c_priceRange,
    c_alcoholType: result.rawData.c_alcoholType,
    c_category: result.rawData.c_category,
    c_subCategory: result.rawData.c_subCategory,
  };

  return validateData(data, {
    name: isString,
    primaryPhoto: isPhotoGallery,
    c_price: isString,
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
          <img
            className="w-24"
            src={beverage.photoGallery?.[0].image.url || beverage.primaryPhoto?.image.url}
          />
        </div>
        <div className="overflow-hidden text-ellipsis text-base max-h-20">{beverage.name}</div>
      </div>
      <div className="">
        <div className="pb-8">
          <div className="text-base">{`$${beverage.c_price}`}</div>
          <StarRating />
        </div>
      </div>
    </div>
  );
};
