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

export interface Beverage {
  id: string;
  name: string;
  photoGallery: Image[];
  c_priceRange: string;
}

// TODO: either pass as prop to other components or add to util folder
export const dataForRender = (result: Result): Partial<Beverage> => {
  const data = {
    id: result.id,
    name: result.name,
    photoGallery: result.rawData.photoGallery,
    c_priceRange: result.rawData.c_priceRange,
  };

  return validateData(data, {
    id: isString,
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
