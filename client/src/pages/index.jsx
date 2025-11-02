import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import ShoppingList from "./ShoppingListPage.jsx"

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/list" element={<ShoppingList/>}/>
      </Routes>
    </>
  );
}
