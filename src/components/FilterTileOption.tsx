interface FilterTileOptionProps {
  label: string;
  count?: number;
}

export const FilterTileOption = ({ label, count }: FilterTileOptionProps) => {
  return (
    <div className="h-10 w-fit bg-toast-light-orange border border-toast-orange flex items-center mr-3 mb-3">
      <div className="px-6">
        {label} {count && <span className="text-xxs">{`(${count})`}</span>}
      </div>
    </div>
  );
};
