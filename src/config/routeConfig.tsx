import { SearchScreen } from "../screens/SearchScreen";

export const routeConfig = [
  {
    path: "/",
    exact: true,
    page: <SearchScreen />,
  },
  // {
  //   path: "/all",
  //   exact: true,
  //   page: (
  //     <UniversalSearchPage universalResultsConfig={universalResultsConfig} />
  //   ),
  // },
  // {
  //   path: "/locations",
  //   page: <LocationsPage verticalKey="locations" />,
  // },
  // {
  //   path: "/classes",
  //   page: <ClassesPage verticalKey="classes" />,
  // },
  // {
  //   path: "/trainers",
  //   page: <TrainersPage verticalKey="trainers" />,
  // },
];
