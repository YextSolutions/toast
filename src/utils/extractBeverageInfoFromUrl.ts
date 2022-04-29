import { Params } from "react-router-dom";

export interface BeverageInfo {
  alcoholType?: string;
  category?: string;
  subCategory?: string;
  beverageId?: string;
}

export const extractBeverageInfoFromUrl = (params: Readonly<Params<string>>): BeverageInfo => {
  const { alcoholType, category, subCategory } = params;
  return {
    alcoholType,
    category: category?.replace("-", " "),
    subCategory: subCategory?.replace("-", " "),
  };
};
