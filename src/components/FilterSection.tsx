import { useState } from "react";

export const FilterSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed z-20 bottom-0 w-full bg-white flex justify-center items-center h-16 border-t">
      <button className="bg-toast-blue w-80 h-10 rounded">
        <p className="text-white text-center font-bold text-base">SORT / FILTER</p>
      </button>
    </div>
  );
};
