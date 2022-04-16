import { v4 as uuid } from "uuid";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export interface RouteData {
  path: string;
  page: JSX.Element;
}

interface PageRouterProps {
  routes: RouteData[];
}

export const PageRouter = ({ routes }: PageRouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={uuid()} path={route.path} element={route.page} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
