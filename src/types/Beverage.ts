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

type Photo = {
  image: Image;
};
export interface Beverage {
  id: string;
  name: string;
  description: string;
  primaryPhoto: Photo;
  c_usState: string;
  c_originCountry: string;
  c_alcoholType: string;
  c_category: string;
  c_subCategory: string;
  c_price: string;
  c_rating: string;
}

export const beverageDataForRender = (result: Result | undefined): Partial<Beverage> => {
  if (!result) return {};

  const data = {
    id: result.id,
    name: result.rawData.name,
    description: result.rawData.description,
    c_usState: result.rawData.c_usState,
    c_originCountry: result.rawData.c_originCountry,
    primaryPhoto: result.rawData.primaryPhoto,
    c_price: result.rawData.c_price,
    c_priceRange: result.rawData.c_priceRange,
    c_alcoholType: result.rawData.c_alcoholType,
    c_category: result.rawData.c_category,
    c_subCategory: result.rawData.c_subCategory,
    c_rating: result.rawData.c_rating,
  };

  return validateData(data, {
    id: isString,
    name: isString,
    description: isString,
    c_usState: isString,
    c_originCountry: isString,
    primaryPhoto: isPhoto,
    c_price: isString,
    c_priceRange: isString,
    c_alcoholType: isString,
    c_category: isString,
    c_subCategory: isString,
    c_rating: isString,
  });
};

const isPhoto = (data: any): data is Photo => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  return data.image && isImage(data.image);
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
