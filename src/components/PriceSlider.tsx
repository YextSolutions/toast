import { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

interface PriceSliderProps {
  min?: number;
  max?: number;
  step?: number;
}

const STEP = 1;
const MIN = 0;
const MAX = 100;

type Bound = "min" | "max";

export const PriceSlider = ({ min, max, step }: PriceSliderProps): JSX.Element => {
  const [values, setValues] = useState<number[]>([0, 100]);

  // TODO: update URL and apply filters in search results screen
  useEffect(() => {
    // onChange(values[0], values[1]);
  }, [values]);

  const handleChange = (value: number, bound: Bound) => {
    if (bound === "min") {
      if (value > values[1]) {
        value = values[1];
      }
      setValues([value, values[1]]);
    } else {
      if (value < (min ?? MIN)) {
        value = min ?? MIN;
      }
      setValues([values[0], value]);
    }
  };

  return (
    <div className="px-4">
      <div className="mb-8 font-bold">PRICE RANGE</div>
      <div className="px-2">
        <Range
          step={step ?? STEP}
          min={min ?? MIN}
          max={max ?? MAX}
          values={values}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                background: getTrackBackground({
                  values,
                  colors: ["#c4c4c442", "#FFB563", "#c4c4c442"],
                  min: min ?? MIN,
                  max: max ?? MAX,
                }),
              }}
              className="border border-toast-orange h-2 w-full "
            >
              {children}
            </div>
          )}
          renderThumb={({ index, props }) => (
            <div
              {...props}
              style={{
                ...props.style,
              }}
              className="rounded-full bg-toast-orange h-6 w-6"
            >
              <div className="-top-4 text-xs absolute">{`$${
                values[index] === (max ?? MAX)
                  ? values[index].toFixed(0) + "+"
                  : values[index].toFixed(0)
              }`}</div>
            </div>
          )}
        />
      </div>
      <div className="flex justify-between mt-6">
        {/* TODO: move to function */}
        <div className="flex">
          <div className="border-t border-l border-b h-8 flex items-center ">$</div>
          <input
            className="w-16 h-8 border-t border-b border-r text-sm outline-none "
            type="number"
            value={values[0]}
            onChange={(e) => handleChange(Number(e.target.value), "min")}
          />
        </div>
        <div className="flex">
          <div className="border-t border-l border-b h-8 flex items-center ">$</div>
          <input
            className="w-16 h-8 border-t border-b border-r text-sm outline-none "
            type="number"
            value={values[1]}
            onChange={(e) => handleChange(Number(e.target.value), "max")}
          />
        </div>
      </div>
    </div>
  );
};
