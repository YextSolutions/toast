import {
  CardProps,
  isString,
  validateData,
} from "@yext/answers-react-components";
import ImageAssets from "../assets/imageAssets";
import { dataForRender } from "./BeverageCard";

export const BeverageCarouselCard = ({ result }: CardProps) => {
  const beverage = dataForRender(result);

  return (
    <div className="flex flex-col">
      <div className="border border-toast-dark-orange bg-toast-light-orange mx-1">
        <div className="w-52 h-40 flex justify-center items-center">
          {/* TODO: replace with actual image */}
          <img className="" src={ImageAssets.titos} />
        </div>
      </div>
      <div className="mt-2 mb-6">
        <div className="font-semibold text-xxs">{beverage.name}</div>
        <div className="text-xxs">{beverage.c_priceRange?.split(" ")[0]}</div>
      </div>
    </div>
  );
};
