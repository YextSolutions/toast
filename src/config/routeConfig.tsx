import ImageAssets from "../assets/imageAssets";
import { BeverageTag } from "../components/CarouselSection";
import { RouteData } from "../PageRouter";
import { BeverageResultsScreen } from "../screens/BeverageResultsScreen";
import { SearchScreen } from "../screens/SearchScreen";

export const routeConfig: RouteData[] = [
  {
    path: "/",
    page: (
      <SearchScreen
        categoryGrid={{
          title: "BROWSE CATEGORIES",
          options: [
            { name: "BEER", img: ImageAssets.beerBottles, linkPath: "/beer" },
            { name: "WINE", img: ImageAssets.wineGlasses, linkPath: "/wine" },
            {
              name: "LIQOUR",
              img: ImageAssets.orangeCocktail,
              linkPath: "/liquor",
            },
            { name: "OTHER", img: ImageAssets.shaker, linkPath: "/other" },
          ],
        }}
        carouselSections={[
          {
            sectionName: "TRENDING",
            limit: 8,
            beverageTag: BeverageTag.Trending,
          },
          {
            sectionName: "BEST SELLERS",
            limit: 8,
            beverageTag: BeverageTag.BestSeller,
          },
          {
            sectionName: "GIFT GUIDE",
            limit: 8,
            beverageTag: BeverageTag.Gift,
          },
        ]}
      />
    ),
  },
  {
    path: "/wine",
    page: (
      <SearchScreen
        categoryGrid={{
          title: "WINE",
          options: [
            { name: "RED WINE", img: ImageAssets.redWine },
            { name: "WHITE WINE", img: ImageAssets.whiteWine },
            { name: "ROSÉ WINE", img: ImageAssets.rose },
            { name: "SPARKLING WINE", img: ImageAssets.sparklingWine },
            { name: "SPECIALITY WINE", img: ImageAssets.specialityWine },
            { name: "ALL WINE", img: ImageAssets.allWine },
          ],
        }}
      />
    ),
  },
  { path: "/:alcoholType/*", page: <BeverageResultsScreen /> },
];
