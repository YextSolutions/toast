import "./App.css";
import { PageRouter } from "./PageRouter";
import { routeConfig } from "./config/routeConfig";

function App() {
  return (
    <div className="font-primary">
      <PageRouter routes={routeConfig} />
    </div>
  );
}

export default App;
