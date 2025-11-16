import { useState } from 'react';
import { HomePageContext } from '../context/HomePageContext';

export default function HomePageProvider({ children }) {
  const [lists, setLists] = useState([
    {
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
    },
    {
      id: "2",
      name: "Apparel",
      createdAt: new Date(),
      createdBy: "ObjectId",
      participants: ["ObjectId"],
      products: [
        { id: "i1", name: "Skirt", done: false, createdAt: new Date(), createdBy: "ObjectId" },
        { id: "i2", name: "Shirt", done: true, createdAt: new Date(), createdBy: "ObjectId" },
        { id: "i3", name: "Shorts", done: false, createdAt: new Date(), createdBy: "ObjectId" },
      ],
    },
    {
      id: "3",
      name: "Misc",
      createdAt: new Date(),
      createdBy: "ObjectId",
      participants: ["ObjectId"],
      products: [
        { id: "i1", name: "Notebook", done: false, createdAt: new Date(), createdBy: "ObjectId" },
        { id: "i2", name: "Pen", done: true, createdAt: new Date(), createdBy: "ObjectId" },
      ],
    },
  ]);

  const addList = (name, description = "") => {
    if (!name || !name.trim()) return;
    setLists((prev) => [
      ...prev,
      { id: Math.random().toString(10), name: name, products: [], description: description, createdBy: "ObjectId", createdAt: new Date(), participants: ["ObjectId"] },
    ]);
  };

  const deleteList = (listId) => {
    setLists((prev) => prev.filter((list) => list.id !== listId));
  };

  const updateList = (listId, updatedData) => {
    setLists((prev) => prev.map((list) => (list.id === listId ? { ...list, ...updatedData } : list)));
  };

  const value = { lists, addList, deleteList, updateList };

  return (
    <HomePageContext.Provider value={value}>
      {children}
    </HomePageContext.Provider>
  );
}