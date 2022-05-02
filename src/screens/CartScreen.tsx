import { useContext } from "react";
import { SearchCtx } from "../App";
import { BeverageSearchBar } from "../components/BeverageSearchBar";
import { ToastHeader } from "../components/ToastHeader";

export const CartScreen = () => {
  const { searchBarActive } = useContext(SearchCtx);

  return (
    <>
      <ToastHeader />
      {searchBarActive ? <BeverageSearchBar /> : <></>}
    </>
  );
};
