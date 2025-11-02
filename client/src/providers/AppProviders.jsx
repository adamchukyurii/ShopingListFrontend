// src/providers/AppProviders.jsx
import { RouterProvider } from 'react-router-dom';
import  router  from '../routers/index';
import ShoppingListProvider from '../context/ShoppingListContext';

function AppProviders() {
  return (
    <ShoppingListProvider>
      <RouterProvider router={router} />
    </ShoppingListProvider>
  );
}

export default AppProviders;