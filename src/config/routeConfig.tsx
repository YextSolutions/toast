import ImageAssets from "../assets/imageAssets";
import { BeverageTag } from "../components/CarouselSection";
import { RouteData } from "../PageRouter";
import { BeverageResultsPage } from "../pages/BeverageResultsPage";
import { BeveragePage } from "../pages/BeveragePage";
import { CartPage } from "../pages/CartPage";
import { SearchPage } from "../pages/SearchPage";

export const routeConfig: RouteData[] = [
  {
    path: "/",
    page: (
      <SearchPage
        categoryGrid={{
          title: "BROWSE CATEGORIES",
          options: [
            { name: "BEER", img: ImageAssets.beerBottles, linkPath: "/beer" },
            { name: "WINE", img: ImageAssets.wineGlasses, linkPath: "/wine" },
            {
              name: "LIQUOR",
              img: ImageAssets.orangeCocktail,
              linkPath: "/liquor",
            },
            { name: "OTHER", img: ImageAssets.shaker },
          ],
          itemLayoutCssClasses:
            "md:flex md:justify-center md:space-x-8 grid grid-cols-2 justify-items-center gap-2",
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
        headerImage={ImageAssets.cocktails}
      />
    ),
  },
  {
    path: "/search",
    page: <BeverageResultsPage />,
  },
  {
    path: "/wine",
    page: (
      <SearchPage
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
              name: "CHAMPAGNE",
              img: ImageAssets.sparklingWine,
              linkPath: "/wine/champagne",
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
      <SearchPage
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
              linkPath: "/beer/ale/stout-ale",
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
      <SearchPage
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
  { path: "/:categoryA/all", page: <BeverageResultsPage /> },
  { path: "/:categoryA", page: <BeverageResultsPage /> },
  {
    path: "/:categoryA/:categoryB",
    page: <BeverageResultsPage />,
  },
  {
    path: "/:categoryA/:categoryB/:beverageName/:beverageId",
    page: <BeverageResultsPage />,
  },
  {
    path: "/:categoryA/:categoryB/:categoryC",
    page: <BeverageResultsPage />,
  },
  {
    path: "/:categoryA/:categoryB/:categoryC/:beverageName/:beverageId",
    page: <BeverageResultsPage />,
  },
  {
    path: "/:categoryA/:categoryB/:categoryC/:categoryD",
    page: <BeverageResultsPage />,
  },
  {
    path: "/categoryA/:categoryB/:categoryC/:categoryD/:beverageName/:beverageId",
    page: <BeverageResultsPage />,
  },
  { path: "/cart", page: <CartPage /> },
];
