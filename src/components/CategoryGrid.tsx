import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { ImagePlaceholder } from "./ImagePlaceholder";
import ImageAssets from "../assets/imageAssets";
import { GrayWineBottle } from "./BeverageCard";

export interface CategoryGridProps {
  title: string;
  options: {
    img: string;
    name: string;
    linkPath?: string;
  }[];
  itemLayoutCssClasses?: string;
}

export const CategoryGrid = ({
  title,
  options,
  itemLayoutCssClasses,
}: CategoryGridProps): JSX.Element => {
  const navigate = useNavigate();

  const handleTileClick = (linkPath?: string) => {
    if (!linkPath) return;

    navigate(linkPath);
  };

  return (
    <div className="mt-2 px-4">
      <div>
        <span className="text-toast-dark-orange text-base sm:text-2xl font-extrabold">{title}</span>
      </div>
      <div className={itemLayoutCssClasses ?? "grid grid-cols-2 justify-items-center gap-2"}>
        {options.map((option) => {
          return (
            <button onClick={() => handleTileClick(option.linkPath)}>
              <div key={`tile_${uuid()}`} className="flex flex-col items-center mt-4">
                <ImagePlaceholder
                  imgCssClasses="w-40 h-44 object-cover"
                  imgUrl={option.img}
                  placeholder={GrayWineBottle()}
                  alt={"category"}
                />
                <div className="text-toast-blue text-xs sm:text-sm font-semibold mt-1.5 hover:underline">
                  {option.name}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
