import { Result } from "@yext/answers-headless-react";
import { isString, validateData } from "@yext/answers-react-components";
import { CategoryGrid } from "../components/CategoryGrid";
import {
  beerBottles,
  orangeCocktail,
  shaker,
  wineGlasses,
} from "../assets/imageAssets";
import { BeverageTag, CarouselSection } from "../components/CarouselSection";
import { BeverageSearchBar } from "../components/BeverageSearchBar";

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

export const SearchScreen = (): JSX.Element => {
  /*
   * 1. move search container on focus
   * 2. animate movement
   * 3  cancel search bar on close button click / click outside
   *
   * I can't move the search bar because I can't determine when it's being focused on. Maybe I can still use document.activeElement with an id on the SearchBar?
   * I can't control the functionality of the X button
   */

  return (
    <div>
      {/* <div className="w-full flex justify-center">
        <div className={classNames("w-full py-4 px-4 max-w-sm")}>
          <img className="w-full" src="src/img/cocktails.png"></img>
        </div>
      </div> */}
      <BeverageSearchBar />
      <div>
        <CategoryGrid
          title="BROWSE CATEGORIES"
          options={[
            { name: "BEER", img: beerBottles },
            { name: "WINE", img: wineGlasses },
            { name: "LIQOUR", img: orangeCocktail },
            { name: "OTHER", img: shaker },
          ]}
        />
        <div className="mt-11">
          <CarouselSection
            sectionName="TRENDING"
            limit={8}
            beverageTag={BeverageTag.Trending}
          />
        </div>
        <div className="mt-11">
          <CarouselSection
            sectionName="BEST SELLERS"
            limit={8}
            beverageTag={BeverageTag.Trending}
          />
        </div>
        <div className="mt-11">
          <CarouselSection
            sectionName="GIFT GUIDE"
            limit={8}
            beverageTag={BeverageTag.Trending}
          />
        </div>
      </div>
    </div>
  );
};

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
