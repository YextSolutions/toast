import { Beverage } from "../types/Beverage";

export const extractPathFromBeverage = (beverage: Partial<Beverage>): string | undefined => {
  let path = "";

  if (beverage.c_alcoholType) {
    path = path.concat(`/${beverage.c_alcoholType.toLowerCase().replaceAll(" ", "-")}`);
  }
  if (beverage.c_category) {
    path = path.concat(`/${beverage.c_category.toLowerCase().replaceAll(" ", "-")}`);
  }
  if (beverage.c_subCategory) {
    path = path.concat(`/${beverage.c_subCategory.toLowerCase().replaceAll(" ", "-")}`);
  }

  if (!path) return;

  return path.concat(`/page/${beverage.id}`);
};
