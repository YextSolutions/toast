import ImageAssets from "../assets/imageAssets";

export const getSearchPageImage = (page: string): string => {
  switch (page) {
    case "beer":
      return ImageAssets.beerToast;
    case "wine":
      return ImageAssets.wineToast;
    case "liquor":
      return ImageAssets.cocktailToast;
    default:
      return ImageAssets.cocktails;
  }
};
