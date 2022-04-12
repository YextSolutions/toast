import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SearchScreen } from "./screens/SearchScreen";
import { Header } from "./components/Header";
import { DeliveryBanner } from "./components/DeliveryBanner";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="font-primary">
      <Header />
      <DeliveryBanner />
      <SearchScreen />
    </div>
  );
}

export default App;
