// src/routers/index.js
import { createBrowserRouter } from "react-router-dom";

import HomePageLayout from "../layouts/HomePageLayout";
import ShoppingListLayout from "../layouts/ShoppingListLayout";

import ShoppingListPage from "../pages/ShoppingListPage";
import  HomePage  from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      {index: true, element: <HomePage />}
    ]
  },
  {
    path: "/list/:listId",
    element: <ShoppingListLayout />,
    children: [
      {index: true, element: <ShoppingListPage />}
    ]
  },
]);

export default router;
