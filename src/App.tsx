import "./App.css";
import { BrowserRouter, Route, Routes, useH } from "react-router-dom";
import { SearchScreen } from "./screens/SearchScreen";
import { Header } from "./components/Header";
import { DeliveryBanner } from "./components/DeliveryBanner";
import {
  allWine,
  beerBottles,
  orangeCocktail,
  redWine,
  rose,
  shaker,
  sparklingWine,
  specialityWine,
  whiteWine,
  wineGlasses,
} from "./assets/imageAssets";
import { BeverageTag } from "./components/CarouselSection";

function App() {
  return (
    <div className="font-primary">
      <Header />
      <DeliveryBanner />
      {/* TODO: add to config files */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SearchScreen
                categoryGrid={{
                  title: "BROWSE CATEGORIES",
                  options: [
                    { name: "BEER", img: beerBottles, linkPath: "/beer" },
                    { name: "WINE", img: wineGlasses, linkPath: "/wine" },
                    {
                      name: "LIQOUR",
                      img: orangeCocktail,
                      linkPath: "/liquor",
                    },
                    { name: "OTHER", img: shaker, linkPath: "/other" },
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
            }
          />
          <Route
            path="/wine"
            element={
              <SearchScreen
                categoryGrid={{
                  title: "WINE",
                  options: [
                    { name: "RED WINE", img: redWine },
                    { name: "WHITE WINE", img: whiteWine },
                    { name: "ROSÉ WINE", img: rose },
                    { name: "SPARKLING WINE", img: sparklingWine },
                    { name: "SPECIALITY WINE", img: specialityWine },
                    { name: "ALL WINE", img: allWine },
                  ],
                }}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
