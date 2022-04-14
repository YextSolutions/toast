import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchScreen } from "./screens/SearchScreen";
import { Header } from "./components/Header";
import { DeliveryBanner } from "./components/DeliveryBanner";
import {
  beerBottles,
  orangeCocktail,
  shaker,
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
                    { name: "BEER", img: beerBottles },
                    { name: "WINE", img: wineGlasses },
                    { name: "LIQOUR", img: orangeCocktail },
                    { name: "OTHER", img: shaker },
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
