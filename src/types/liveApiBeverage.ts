import { C_tag, EntityReference, Image } from "./beverages";

interface LiveApiBeverage {
  description?: string;
  name: string;
  c_abv?: number;
  c_alcoholType?: string;
  c_category?: string;
  c_linkedAlcoholType?: EntityReference[];
  c_linkedCategory?: EntityReference[];
  c_originCountry?: string;
  c_price?: number;
  c_rating?: number;
  c_subCategory?: string;
  c_tag?: C_tag;
  c_transformedPhoto?: Image;
  c_usState?: string;
  meta: {
    id: string;
  };
}

export default LiveApiBeverage;
