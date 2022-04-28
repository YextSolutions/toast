import { CardProps } from "@yext/answers-react-components";
import { beverageDataForRender } from "../types/Beverage";

export const BeverageCarouselCard = ({ result }: CardProps) => {
  const beverage = beverageDataForRender(result);

  return (
    <div className="flex flex-col">
      <div className="border border-toast-dark-orange  mx-1">
        <div className="w-52 h-40 flex justify-center items-center">
          <img className="w-24" src={beverage.primaryPhoto?.image.sourceUrl} alt="beverage image" />
        </div>
      </div>
      <div className="mt-2 mb-6">
        <div className="font-semibold text-xxs">{beverage.name}</div>
        <div className="text-xxs">{beverage.c_priceRange?.split(" ")[0]}</div>
      </div>
    </div>
  );
};
