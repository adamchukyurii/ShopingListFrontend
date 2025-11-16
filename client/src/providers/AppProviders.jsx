import { RouterProvider } from 'react-router-dom';
import router from '../routers';
import HomePageProvider from './HomePageProvider';

export default function AppProviders() {
  return (
    <HomePageProvider>
      <RouterProvider router={router} />
    </HomePageProvider>
  );
}