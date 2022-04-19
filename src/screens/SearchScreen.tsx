import { v4 as uuid } from "uuid";
import { CategoryGrid, CategoryGridProps } from "../components/CategoryGrid";
import { CarouselSection, CarouselSectionProps } from "../components/CarouselSection";
import { BeverageSearchBar } from "../components/BeverageSearchBar";
import { useContext } from "react";
import { SearchCtx } from "../App";
import { DeliveryBanner } from "../components/DeliveryBanner";
import { ToastHeader } from "../components/ToastHeader";

interface SearchScreenProps {
  categoryGrid?: CategoryGridProps;
  carouselSections?: CarouselSectionProps[];
}

// TODO: Rename
export const SearchScreen = ({
  categoryGrid,
  carouselSections,
}: SearchScreenProps): JSX.Element => {
  const { active, setActive } = useContext(SearchCtx);

  return (
    <div>
      <ToastHeader />
      {active ? (
        <BeverageSearchBar />
      ) : (
        <div className="absolute top-28 w-screen">
          {categoryGrid && (
            <CategoryGrid title={categoryGrid.title} options={categoryGrid.options} />
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
