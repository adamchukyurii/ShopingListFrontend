import ShoppingListProvider from "../providers/ShoppingListProvider";
import { Outlet, useParams } from "react-router-dom";
import { useHomePage } from "../context/useHomePage";

export default function ShoppingListLayout() {
  const { listId } = useParams();
  const { lists } = useHomePage();

  const list = lists.find(l => l.id === listId);

  if (!list) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>List not found</p>
        <a href="/" style={{ color: "#2563eb" }}>Back to Home</a>
      </div>
    );
  }

  return (
    <ShoppingListProvider>
      <Outlet context={{ list }} />
    </ShoppingListProvider>
  );
}