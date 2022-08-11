export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
}

export interface BeverageCategory {
  name: string;
  c_parentCategory: {
    name: string;
  }[];
}
export default interface Beverage {
  primaryPhoto?: ComplexImage;
  name: string;
  c_abv?: number;
  c_alcoholType?: string;
  c_category?: string;
  c_originCountry?: string;
  c_price?: number;
  c_subCategory?: string;
  c_usState?: string;
  c_beverageCategories?: BeverageCategory[];
}
