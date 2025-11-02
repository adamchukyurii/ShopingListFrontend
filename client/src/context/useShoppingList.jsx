import { useContext } from 'react';
import { ShoppingListContext } from './ShoppingListContext';

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within ShoppingListProvider');
  }
  return context;

};