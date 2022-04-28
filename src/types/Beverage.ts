import { Result } from "@yext/answers-headless-react";
import { isString, validateData } from "@yext/answers-react-components";

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
  c_priceRange: string;
}

// TODO: either pass as prop to other components or add to util folder
export const beverageDataForRender = (result: Result | undefined): Partial<Beverage> => {
  if (!result) return {};

  const data = {
    name: result.rawData.name,
    primaryPhoto: result.rawData.primaryPhoto,
    c_price: result.rawData.c_price,
    c_priceRange: result.rawData.c_priceRange,
    c_alcoholType: result.rawData.c_alcoholType,
    c_category: result.rawData.c_category,
    c_subCategory: result.rawData.c_subCategory,
  };

  return validateData(data, {
    name: isString,
    primaryPhoto: isPhotoGallery,
    c_price: isString,
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
