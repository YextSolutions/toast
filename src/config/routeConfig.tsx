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
            { name: "OTHER", img: ImageAssets.shaker },
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
    path: "/search",
    page: <BeverageResultsScreen />,
  },
  {
    path: "/wine",
    page: (
      <SearchScreen
        categoryGrid={{
          title: "WINE",
          options: [
            {
              name: "RED WINE",
              img: ImageAssets.redWine,
              linkPath: "/wine/red-wine",
            },
            {
              name: "WHITE WINE",
              img: ImageAssets.whiteWine,
              linkPath: "/wine/white-wine",
            },
            { name: "ROSÉ WINE", img: ImageAssets.rose, linkPath: "/wine/rose-wine" },
            {
              name: "SPARKLING WINE",
              img: ImageAssets.sparklingWine,
              linkPath: "/wine/sparkling-wine",
            },
            {
              name: "DESSERT WINE",
              img: ImageAssets.specialityWine,
              linkPath: "/wine/dessert-wine",
            },
            {
              name: "ALL WINE",
              img: ImageAssets.allWine,
              linkPath: "/wine/all",
            },
          ],
        }}
      />
    ),
  },
  {
    path: "/beer",
    page: (
      <SearchScreen
        categoryGrid={{
          title: "BEER",
          options: [
            { name: "LAGER", img: ImageAssets.lager, linkPath: "/beer/lager" },
            { name: "IPA", img: ImageAssets.ipa, linkPath: "/beer/ale/ipa" },
            {
              name: "HARD SELTZER",
              img: ImageAssets.hardSeltzer,
              linkPath: "/beer/specialty-beer-alternatives/hard-seltzer",
            },
            {
              name: "CIDER",
              img: ImageAssets.cider,
              linkPath: "/beer/cider",
            },
            {
              name: "STOUT",
              img: ImageAssets.stout,
              linkPath: "/beer/ale/stout",
            },
            {
              name: "ALL BEERS",
              img: ImageAssets.hardKombucha,
              linkPath: "/beer/all",
            },
          ],
        }}
      />
    ),
  },

  {
    path: "/liquor",
    page: (
      <SearchScreen
        categoryGrid={{
          title: "LIQUOR",
          options: [
            {
              name: "VODKA",
              img: ImageAssets.vodka,
              linkPath: "/liquor/vodka",
            },
            {
              name: "TEQUILA",
              img: ImageAssets.whiteWine,
              linkPath: "/liquor/tequila",
            },
            {
              name: "WHISKEY",
              img: ImageAssets.whiskey,
              linkPath: "/liquor/whiskey",
            },
            { name: "RUM", img: ImageAssets.rum, linkPath: "/liquor/rum" },
            {
              name: "MEZCAL",
              img: ImageAssets.mezcal,
              linkPath: "/liquor/mezcal",
            },
            {
              name: "ALL LIQUOR",
              img: ImageAssets.otherLiquor,
              linkPath: "/liquor/all",
            },
          ],
        }}
      />
    ),
  },
  { path: "/:alcoholType/*", page: <BeverageResultsScreen /> },
  { path: "/:alcoholType/:category/*", page: <BeverageResultsScreen /> },
  {
    path: "/:alcoholType/:category/:subCategory/*",
    page: <BeverageResultsScreen />,
  },
];
