import BeverageCategory from "../types/beverage_categories";

const getCategoryOrderFromBeverageCategory = (category: BeverageCategory): string[] => {
  const categories: string[] = [];
  categories.push(category.name);
  if (category.c_parentCategory) {
    categories.push(category.c_parentCategory[0].name);
  }
  if (category.c_parentCategory?.[0].c_parentCategory) {
    categories.push(category.c_parentCategory?.[0].c_parentCategory?.[0].name);
  }
  if (category.c_parentCategory?.[0].c_parentCategory?.[0].c_parentCategory) {
    categories.push(
      category.c_parentCategory?.[0].c_parentCategory?.[0].c_parentCategory?.[0].name
    );
  }

  return categories.reverse();
};

export default getCategoryOrderFromBeverageCategory;
