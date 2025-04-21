import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <div className='flex gap-2 max-sm:gap-1'>
      {options.map((option) => (
        <Button
          variant='ghost'
          className={cn(
            "hover:bg-cBrand-600 hover:text-cBrand-100 px-2 py-1 rounded-sm border font-normal",
            option.value === currentFilter && "bg-cBrand-600 text-cBrand-100"
          )}
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default Filter;
