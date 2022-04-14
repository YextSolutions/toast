import "./App.css";
import { Header } from "./components/Header";
import { DeliveryBanner } from "./components/DeliveryBanner";
import { PageRouter } from "./PageRouter";
import { routeConfig } from "./config/routeConfig";

function App() {
  return (
    <div className="font-primary">
      <Header />
      <DeliveryBanner />
      <PageRouter routes={routeConfig} />
    </div>
  );
}

export default App;
