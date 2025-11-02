// src/context/ShoppingListContext.jsx
import { createContext, useState } from "react";

export const ShoppingListContext = createContext();

export default function ShoppingListProvider({ children }) {
  const [lists, setLists] = useState([
    {
      id: "1",
      name: "My Shopping List",
      items: [
        { id: "i1", text: "Milk", done: false },
        { id: "i2", text: "Bread", done: true },
        { id: "i3", text: "Eggs", done: false },
      ],
    },
  ]);

  const addItem = (listId, text) => {
    if (!text.trim()) return;
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: [...list.items, { id: Date.now().toString(), text, done: false }],
            }
          : list
      )
    );
  };

  const toggleItem = (listId, itemId) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId ? { ...item, done: !item.done } : item
              ),
            }
          : list
      )
    );
  };

  const deleteItem = (listId, itemId) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, items: list.items.filter((i) => i.id !== itemId) }
          : list
      )
    );
  };

  const value = { lists, addItem, toggleItem, deleteItem };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
}

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error("useShoppingList must be used within ShoppingListProvider");
  }
  return context;
};