import { useState } from 'react';
import { ShoppingListContext } from '../context/ShoppingListContext';

export default function ShoppingListProvider({ children }) {
  const [list, setList] = useState({
      id: "1",
      name: "My Shopping List",
      createdAt: new Date(),
      createdBy: "ObjectId",
      participants: ["ObjectId"],
      products: [
        { id: "i1", name: "Milk", done: false, createdAt: new Date(), createdBy: "ObjectId" },
        { id: "i2", name: "Bread", done: true, createdAt: new Date(), createdBy: "ObjectId" },
        { id: "i3", name: "Eggs", done: false, createdAt: new Date(), createdBy: "ObjectId" },
      ],
    });

  const addItem = (listId, name) => {
  console.log("Adding item to list:", name, listId);
  if (!name.trim()) return -1;
  setList((prev) => {
    if (prev.id !== listId) return prev;
    const newItem = {
      id: Math.random().toString(36),
      name: name,
      done: false,
      createdAt: new Date(),
      createdBy: "ObjectId",
    };
    return {
      ...prev,
      products: [...prev.products, newItem],
    };
    });
  }

  const toggleItem = (listId, itemId) => {
    setList((prev) => {
      if (prev.id !== listId) return prev;
      return {
        ...prev,
        products: prev.products.map((item) => {
          if (item.id === itemId) {
            return { ...item, done: !item.done };
          }
          return item;    
        })
      }
    })   
  }

  const deleteItem = (listId, itemId) => {
    setList((prev) => {
      if (prev.id !== listId) return prev;
      return {
        ...prev,
        products: prev.products.filter((item) => item.id !== itemId)
      }
    })
  };

  const value = { list, addItem, toggleItem, deleteItem };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
}