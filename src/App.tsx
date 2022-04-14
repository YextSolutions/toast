import "./App.css";
import { SearchScreen } from "./screens/HomeSearchScreen";
import { Header } from "./components/Header";
import { DeliveryBanner } from "./components/DeliveryBanner";

function App() {
  return (
    <div className="font-primary">
      <Header />
      <DeliveryBanner />
      <SearchScreen />
    </div>
  );
}

export default App;
