import { v4 as uuid } from "uuid";
import { Result } from "@yext/answers-headless-react";
import { isString, validateData } from "@yext/answers-react-components";
import { CategoryGrid, CategoryGridProps } from "../components/CategoryGrid";
import { BeverageTag, CarouselSection, CarouselSectionProps } from "../components/CarouselSection";
import { BeverageSearchBar } from "../components/BeverageSearchBar";
import { useContext } from "react";
import { SearchCtx } from "../App";
import { DeliveryBanner } from "../components/DeliveryBanner";
import { Header } from "../components/Header";

interface SearchScreenProps {
  categoryGrid?: CategoryGridProps;
  carouselSections?: CarouselSectionProps[];
}

export const SearchScreen = ({
  categoryGrid,
  carouselSections,
}: SearchScreenProps): JSX.Element => {
  const { active, setActive } = useContext(SearchCtx);

  return (
    <div>
      {/* <div className="w-full flex justify-center">
        <div className={classNames("w-full py-4 px-4 max-w-sm")}>
          <img className="w-full" src="src/img/cocktails.png"></img>
        </div>
      </div> */}
      <Header />
      <DeliveryBanner />
      {active && <BeverageSearchBar />}
      <div>
        {categoryGrid && <CategoryGrid title={categoryGrid.title} options={categoryGrid.options} />}
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
