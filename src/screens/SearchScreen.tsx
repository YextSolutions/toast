import { Result } from "@yext/answers-headless-react";
import { isString, validateData } from "@yext/answers-react-components";
import { CategoryGrid, CategoryGridProps } from "../components/CategoryGrid";
import {
  BeverageTag,
  CarouselSection,
  CarouselSectionProps,
} from "../components/CarouselSection";
import { BeverageSearchBar } from "../components/BeverageSearchBar";

interface SearchScreenProps {
  categoryGrid?: CategoryGridProps;
  carouselSections?: CarouselSectionProps[];
}

export const SearchScreen = ({
  categoryGrid,
  carouselSections,
}: SearchScreenProps): JSX.Element => {
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
        {categoryGrid && (
          <CategoryGrid
            title={categoryGrid.title}
            options={categoryGrid.options}
          />
        )}
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
