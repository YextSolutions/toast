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

function App() {
  return (
    <div className="font-primary">
      <Header />
      <DeliveryBanner />
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
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
