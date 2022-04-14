import { Result } from "@yext/answers-headless-react";
import {
  CardProps,
  isString,
  validateData,
} from "@yext/answers-react-components";
import classNames from "classnames";

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
  photoGallery: Image[];
  c_priceRange: string;
}

// TODO: either pass as prop to other components or add to util folder
export const dataForRender = (result: Result): Partial<Beverage> => {
  const data = {
    name: result.rawData.name,
    photoGallery: result.rawData.photoGallery,
    c_priceRange: result.rawData.c_priceRange,
  };

  return validateData(data, {
    name: isString,
    photoGallery: isPhotoGallery,
    c_priceRange: isString,
  });
};

const isPhotoGallery = (data: any): data is [] => {
  // if (!Array.isArray(data) || data === null) {
  //   return false;
  // }

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

interface BeverageCardProps extends CardProps {}

export const BeverageCard = ({ result }: BeverageCardProps): JSX.Element => {
  const beverage = dataForRender(result);

  return (
    <div
      className={classNames("flex py-1 items-center h-20 w-20", {
        // "max-h-28": beverageImg,
      })}
    >
      <div>TEST</div>
      {/* <div className="w-16">
        <img src={beverageImg} />
      </div>
      <div className="ml-6 text-sm w-80">
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
        <StarRating />
      </div> */}
    </div>
  );
};
