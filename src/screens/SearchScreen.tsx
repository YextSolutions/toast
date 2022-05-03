import { v4 as uuid } from "uuid";
import { CategoryGrid, CategoryGridProps } from "../components/CategoryGrid";
import { CarouselSection, CarouselSectionProps } from "../components/CarouselSection";
import { BeverageSearchBar } from "../components/BeverageSearchBar";
import { useContext } from "react";
import { SearchCtx } from "../App";
import { ToastHeader } from "../components/ToastHeader";
import ImageAssets from "../assets/imageAssets";
import useWindowDimensions from "../hooks/useWindowDimensions";

interface SearchScreenProps {
  categoryGrid?: CategoryGridProps;
  carouselSections?: CarouselSectionProps[];
  headerImage?: string;
}

export const SearchScreen = ({
  categoryGrid,
  carouselSections,
  headerImage,
}: SearchScreenProps): JSX.Element => {
  const { searchBarActive, setSearchBarActive } = useContext(SearchCtx);

  const { height } = useWindowDimensions();

  return (
    <div className="relative h-full w-full flex justify-center">
      <ToastHeader />
      {searchBarActive ? (
        <div
          className="absolute top-16 w-full  bg-white overflow-y-scroll"
          style={{ maxHeight: `${height - 64}px` }}
        >
          <BeverageSearchBar />
        </div>
      ) : (
        <div className="absolute top-28  w-screen sm:max-w-7xl">
          {headerImage && (
            <div className="flex justify-center my-8">
              <img
                className={"sm:w-[42.75rem] sm:h-[21.75rem] w-96 h-44"}
                src={ImageAssets.cocktails}
              />
            </div>
          )}
          {categoryGrid && (
            <CategoryGrid
              title={categoryGrid.title}
              options={categoryGrid.options}
              itemLayoutCssClasses={categoryGrid.itemLayoutCssClasses}
            />
          )}
          {carouselSections &&
            carouselSections.map((section, i) => (
              <div key={`carousel_${uuid()}`} className="mt-11">
                <CarouselSection
                  sectionName={section.sectionName}
                  limit={8}
                  beverageTag={section.beverageTag}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
