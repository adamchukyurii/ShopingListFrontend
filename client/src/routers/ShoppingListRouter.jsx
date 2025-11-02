import { createBrowserRouter } from "react-router-dom";
import ShoppingListPage from "../pages/ShoppingListPage";
import HomePage from "../pages/HomePage";

const ShoppingListRouter = createBrowserRouter([
  {
    path: "list/:id",
    element: ShoppingListPage,
  },
]);

export default ShoppingListRouter;