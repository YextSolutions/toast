import { Result } from "@yext/answers-headless-react";
import { isString, validateData } from "@yext/answers-react-components";
import { isArray } from "./Beverage";

type EntityType = "ce_alcoholType" | "ce_category" | "ce_subCategory";

const isEntityType = (maybeEntityType: any): maybeEntityType is EntityType =>
  maybeEntityType === "ce_alcoholType" ||
  maybeEntityType === "ce_category" ||
  maybeEntityType === "ce_subCategory";

type LinkedTypeName = {
  name: string;
};

const isLinkedTypeName = (data: any): data is LinkedTypeName => isString(data.name);

const isLinkedTypeNameArray = (data: any): data is LinkedTypeName[] =>
  isArray(data) && data.every((name: any) => isLinkedTypeName(name));

type LinkedCategory = {
  name: string;
  c_linkedAlcoholType: LinkedTypeName[];
};

const isLinkedCategory = (data: any): data is LinkedCategory => {
  return (
    isString(data.name) &&
    isArray(data.c_linkedAlcoholType) &&
    data.c_linkedAlcoholType.every((linkedAlcType: LinkedTypeName) =>
      isLinkedTypeName(linkedAlcType)
    )
  );
};

const isLinkedCategoryArray = (data: any): data is LinkedCategory[] =>
  isArray(data) && data.every((name: any) => isLinkedCategory(name));

export interface AlcoholicBeverageType {
  name: string;
  type: EntityType;
  c_linkedAlcoholType: LinkedTypeName[];
  c_linkedCategory: LinkedCategory[];
}

export function isAlcoholicBeverageType(data: any): data is AlcoholicBeverageType {
  return (
    typeof data === "object" &&
    data.name &&
    data.type(
      data.type === "ce_alcoholType" ||
        data.type === "ce_category" ||
        data.type === "ce_subCategory"
    )
  );
}

export const alcholicBeverageTypeDataForRender = (
  result: Result | undefined
): Partial<AlcoholicBeverageType> => {
  if (!result) return {};

  const data = {
    name: result.rawData.name,
    type: result.rawData.type,
    c_linkedAlcoholType: result.rawData.c_linkedAlcoholType,
    c_linkedCategory: result.rawData.c_linkedCategory,
  };

  return validateData(data, {
    name: isString,
    type: isEntityType,
    c_linkedAlcoholType: isLinkedTypeNameArray,
    c_linkedCategory: isLinkedCategoryArray,
  });
};
