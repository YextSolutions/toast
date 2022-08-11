import { useContext, useEffect, useMemo, useState } from "react";
import { useSearchState, Matcher } from "@yext/search-headless-react";
import { Range, getTrackBackground } from "react-range";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { OverlayActionTypes, OverlayContext } from "../providers/OverlayProvider";

interface PriceSliderProps {
  min?: number;
  max?: number;
  step?: number;
}

const STEP = 1;
const MIN = 0;
const MAX = 100;

export const PriceSlider = ({ min, max, step }: PriceSliderProps): JSX.Element => {
  const [priceValues, setPriceValues] = useState<number[]>([min ?? MIN, max ?? MAX]);

  const [searchParams, setSearchParams] = useSearchParams();

  const { dispatch } = useContext(OverlayContext);

  const priceFilter = useSearchState((state) =>
    state.filters.static?.find((f) => f.fieldId === "c_price")
  );

  useEffect(() => {
    if (priceFilter) {
      if (priceFilter.matcher === Matcher.Between) {
        setPriceValues([priceFilter.value.start.value, priceFilter.value.end.value]);
      } else if (priceFilter.matcher === Matcher.GreaterThanOrEqualTo) {
        setPriceValues([priceFilter.value, max ?? MAX]);
      }
    } else {
      setPriceValues([MIN, MAX]);
    }
  }, []);

  const updateUrl = (priceMin: number, priceMax?: number): void => {
    searchParams.set("price", priceMax ? `${priceMin}-${priceMax}` : `${priceMin}`);
    setSearchParams(searchParams);
    dispatch({ type: OverlayActionTypes.ToggleFilterOverlay, payload: { open: false } });
  };

  const debouncedUpdateUrl = useMemo(() => debounce(updateUrl, 500), []);

  const handleChange = (values: number[]) => {
    if (values[0] > values[1]) {
      values[0] = values[1];
    }
    if (values[1] < values[0]) {
      values[1] = values[0];
    }

    setPriceValues(values);

    values[1] < (max ?? MAX)
      ? debouncedUpdateUrl(values[0], values[1])
      : debouncedUpdateUrl(values[0]);
  };

  return (
    <div className="px-8 md:px-6">
      <div className="mb-8 font-bold">PRICE RANGE</div>
      <div className="px-2">
        <Range
          step={step ?? STEP}
          min={min ?? MIN}
          max={max ?? MAX}
          values={priceValues}
          onChange={(values) => handleChange(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                background: getTrackBackground({
                  values: priceValues,
                  colors: ["#c4c4c442", "#FFB563", "#c4c4c442"],
                  min: min ?? MIN,
                  max: max ?? MAX,
                }),
              }}
              className="h-2 w-full border border-toast-orange "
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
              className="h-6 w-6 rounded-full bg-toast-orange"
            >
              <div className="absolute -top-4 text-xs">{`$${
                priceValues[index] === (max ?? MAX)
                  ? priceValues[index].toFixed(0) + "+"
                  : priceValues[index].toFixed(0)
              }`}</div>
            </div>
          )}
        />
      </div>
      <div className="mt-6 flex justify-between">
        {/* TODO: move to function */}
        <div className="flex">
          <div className="flex h-8 items-center border-t border-l border-b ">$</div>
          <input
            className="h-8 w-16 border-t border-b border-r text-sm outline-none "
            type="number"
            value={priceValues[0]}
            onChange={(e) => handleChange([Number(e.target.value), priceValues[1]])}
          />
        </div>
        <div className="flex">
          <div className="flex h-8 items-center border-t border-l border-b ">$</div>
          <input
            className="h-8 w-16 border-t border-b border-r text-sm outline-none "
            type="number"
            value={priceValues[1]}
            onChange={(e) => handleChange([priceValues[0], Number(e.target.value)])}
          />
        </div>
      </div>
    </div>
  );
};
