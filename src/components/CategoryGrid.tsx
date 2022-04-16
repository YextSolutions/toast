import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

export interface CategoryGridProps {
  title: string;
  options: {
    img: string;
    name: string;
    linkPath?: string;
  }[];
}

export const CategoryGrid = ({ title, options }: CategoryGridProps): JSX.Element => {
  const navigate = useNavigate();

  const handleTileClick = (linkPath?: string) => {
    if (!linkPath) return;

    navigate(linkPath);
  };

  return (
    <div className="mt-2 px-4">
      <div>
        <span className="text-toast-dark-orange text-base font-extrabold">{title}</span>
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-2">
        {options.map((option) => {
          return (
            <button onClick={() => handleTileClick(option.linkPath)}>
              <div key={`tile_${uuid()}`} className="flex flex-col items-center mt-4">
                <img className="object-cover w-40 h-44" src={option.img} />
                <div className="text-toast-blue text-xs mt-1.5 hover:underline">{option.name}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
