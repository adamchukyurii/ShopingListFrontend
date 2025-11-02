// src/routers/index.js
import { createBrowserRouter } from "react-router-dom";
import ShoppingListPage from "../pages/ShoppingListPage";

const router = createBrowserRouter([
  {
    path: "/list",
    element: <ShoppingListPage />, // ← JSX (correct)
  },
  {
    path: "/",
    element: <div>Hello World</div>, // ← JSX (correct)
  },
]);

export default router;
