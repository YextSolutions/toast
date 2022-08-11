import Beverage from "../types/beverages";

export default function getCategoryOrderFromBeverage(beverage: Beverage): string[] {
  const orderedCats: string[] = [];
  if (beverage.c_beverageCategories) {
    beverage.c_beverageCategories.forEach((cat) => {
      if (!cat.c_parentCategory) {
        orderedCats.unshift(cat.name);
      } else {
        const parent = cat.c_parentCategory[0].name;
        const index = orderedCats.indexOf(parent);
        if (index === -1) {
          orderedCats.push(cat.name);
        } else {
          orderedCats.splice(index + 1, 0, cat.name);
        }
      }
    });
  }
  return orderedCats;
}
