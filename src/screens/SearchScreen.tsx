import { v4 as uuid } from "uuid";
import { CategoryGrid, CategoryGridProps } from "../components/CategoryGrid";
import { CarouselSection, CarouselSectionProps } from "../components/CarouselSection";
import { ToastHeader } from "../components/ToastHeader";
import ImageAssets from "../assets/imageAssets";

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
  return (
    <div className="relative flex h-full w-full justify-center">
      <ToastHeader />
      <div className="absolute top-28  w-screen sm:max-w-7xl">
        {headerImage && (
          <div className="my-8 flex justify-center">
            <img
              className={"h-44 w-96 sm:h-[21.75rem] sm:w-[42.75rem]"}
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
    </div>
  );
};
