import { Direction, SortBy, SortType } from "@yext/search-headless-react";

const sortConfig: Record<string, { label: string; sortBy: SortBy }> = {
  price_desc: {
    label: "Price: High to Low",
    sortBy: { field: "c_price", direction: Direction.Descending, type: SortType.Field },
  },
  price_asc: {
    label: "Price: Low to High",
    sortBy: { field: "c_price", direction: Direction.Ascending, type: SortType.Field },
  },
  alpha_asc: {
    label: "Name: A-Z",
    sortBy: { field: "name", direction: Direction.Ascending, type: SortType.Field },
  },
  alpha_desc: {
    label: "Name: Z-A",
    sortBy: { field: "name", direction: Direction.Descending, type: SortType.Field },
  },
};

export default sortConfig;
