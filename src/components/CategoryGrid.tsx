import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { GrayWineBottleIcon } from "./GrayWineBottleIcon";

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
        <span className="text-base font-extrabold text-toast-dark-orange sm:text-2xl">{title}</span>
      </div>
      <div className={itemLayoutCssClasses ?? "grid grid-cols-2 justify-items-center gap-2"}>
        {options.map((option) => {
          return (
            <button onClick={() => handleTileClick(option.linkPath)}>
              <div key={`tile_${uuid()}`} className="mt-4 flex flex-col items-center">
                <ImagePlaceholder
                  imgCssClasses="w-40 h-44 object-cover"
                  imgUrl={option.img}
                  placeholder={GrayWineBottleIcon()}
                  alt={"category"}
                />
                <div className="mt-1.5 text-xs font-semibold text-toast-blue hover:underline sm:text-sm">
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
