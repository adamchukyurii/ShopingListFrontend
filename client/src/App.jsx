import { useState } from 'react';
import AppRoutes  from './pages';
import UserProvider from './providers/UserProvider';
import ShoppingListRouter  from './routers/ShoppingListRouter'


import './App.css'


function App() {
  return (
    <AppRoutes />
  );
}

export default App;
