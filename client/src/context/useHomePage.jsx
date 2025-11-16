import { useContext } from "react";
import { HomePageContext } from "./HomePageContext";

export const useHomePage = () => {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error("useHomePage must be used within ShoppingListProvider");
  }
  return context;
};