import { AlcoholicBeverageType } from "../types/BeverageType";

export const extractPathFromBeverageType = (
  beverageType: Partial<AlcoholicBeverageType>
): string => {
  if (!beverageType.name || !beverageType.type) return "";

  if (beverageType.type === "ce_alcoholType") {
    return `/${beverageType.name.toLowerCase()}/all`;
  } else if (beverageType.type === "ce_category") {
    return `/${beverageType.c_linkedAlcoholType?.[0].name
      .toLowerCase()
      .replaceAll(" ", "-")}/${beverageType.name.toLowerCase().replaceAll(" ", "-")}`;
  } else if (beverageType.type === "ce_subCategory") {
    return `/${beverageType.c_linkedCategory?.[0].c_linkedAlcoholType?.[0].name.toLowerCase()}/${beverageType.c_linkedCategory?.[0].name
      .toLowerCase()
      .replaceAll(" ", "-")}/${beverageType.name.toLowerCase().replaceAll(" ", "-")}`;
  } else {
    return "";
  }
};
