/*
 * 1. Props: Title, Image + Name + onClick,
 */
interface CategoryGridProps {
  title: string;
  options: {
    img: string;
    name: string;
    onClick?: () => void;
  }[];
}

export const CategoryGrid = ({
  title,
  options,
}: CategoryGridProps): JSX.Element => (
  <div className="px-4">
    <div>
      <span className="text-toast-dark-orange text-base font-extrabold">
        {title}
      </span>
    </div>
    <div className="grid grid-cols-2 justify-items-center gap-2">
      {options.map((option, i) => {
        return (
          <div
            key={`${i}_${option.name}`}
            className="flex flex-col items-center mt-4"
          >
            <img className="object-cover w-40 h-44" src={option.img} />
            <div className="text-toast-blue text-xs mt-1.5">{option.name}</div>
          </div>
        );
      })}
    </div>
  </div>
);

{
  /* <div className="grid grid-cols-2 justify-items-center gap-2">
        <div className="flex flex-col items-center mt-4">
          <img
            className="object-cover w-40 h-44"
            src="src/img/beer_bottles.png"
          />
          <div className="text-toast-blue text-xs mt-1.5">BEER</div>
        </div>
        <div className="mt-4">
          <img
            className="object-cover w-40 h-44"
            src="src/img/wine_glasses.png"
          />
          <span className="text-toast-blue text-sm">WINE</span>
        </div>
        <div className="mt-4">
          <img
            className="object-cover w-40 h-44"
            src="src/img/orange_cocktail.png"
          />
          <span className="text-toast-blue text-sm">SPIRITS</span>
        </div>
        <div className="mt-4">
          <img className="object-cover w-40 h-44" src="src/img/shaker.png" />
          <span className="text-toast-blue text-sm">OTHER</span>
        </div>
      </div>  */
}
