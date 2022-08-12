interface ParentCategory {
  name: string;
  c_parentCategory: ParentCategory[];
}

export default interface BeverageCategory {
  name: string;
  c_parentCategory: ParentCategory[];
}
